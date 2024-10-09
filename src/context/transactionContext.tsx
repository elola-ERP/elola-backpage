import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { DetailProductProps, SelectedProductProps, TransactionContextProps } from "./type";

export const TransactionContext = createContext<TransactionContextProps | undefined>(undefined);

// Custom hook for handling local storage and state

function useLocalStorage<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        if(typeof window === "undefined") return defaultValue;
        const storedValue = localStorage.getItem(key);
        console.log(`Initializing ${key} with value: ${storedValue}`);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            console.log(`Saving ${key} with value: ${value}`);
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [key, value])
    return [value, setValue] as const;
}


export function TransactionContextProvider({children}: PropsWithChildren<{}>) {

    const [username, setUsername] = useLocalStorage<string>("username", "");

    const [state, setState] = useLocalStorage<string>("state", "initial value");

    const [orderType, setOrderType] = useLocalStorage<string>("orderType", "");

    const [orderTime, setOrderTime] = useLocalStorage<string>("orderTime", "");

    const [orderDate, setOrderDate] = useLocalStorage<string>("orderDate", "");

    const [customerName, setCustomerName] = useLocalStorage<string>("customerName", "");

    const [isCustomerSaved, setCustomerSaved] = useLocalStorage<boolean>("isCustomerSaved", false);
    
    const [product, setProduct] = useLocalStorage<Array<any>>("product", []);

    const [ detailProduct, setDetailProduct] = useLocalStorage<DetailProductProps>("detailProduct", {
        product_category_id: 0,
        product_name: "",
        product_price: 0,
        product_image: "",
        product_id: 0
    });

    const [selectedProducts, setSelectedProducts] = useLocalStorage<SelectedProductProps[]>("selectedProducts",[]);

    const removeProduct = (product_id: number) => {
        setSelectedProducts(prevProducts =>
            prevProducts.filter((product) => product.product_id !== product_id)
        )
    }

    const resetContext = () => {
        setUsername("");
        setState("initial value");
        setOrderType("");
        setOrderTime("");
        setOrderDate("");
        setCustomerName("");
        setCustomerSaved(false);
        setProduct([]);
        setDetailProduct({
            product_category_id: 0,
            product_name: "",
            product_price: 0,
            product_image: "",
            product_id: 0
        });
        setSelectedProducts([]);
        // Optionally clear local storage
        localStorage.clear();
    };

    const clearOrder = () => {
        setCustomerName("");
        setCustomerSaved(false);
        setOrderType("");
        setSelectedProducts([]);
        setOrderTime("");
        setOrderDate("");
    };

    const value: TransactionContextProps = {
        username, setUsername,
        state, setState,
        orderType, setOrderType,
        orderTime, setOrderTime,
        orderDate, setOrderDate,
        customerName, setCustomerName,
        isCustomerSaved, setCustomerSaved,
        product, setProduct,
        detailProduct, setDetailProduct,
        selectedProducts, setSelectedProducts,
        removeProduct,
        resetContext,
        clearOrder
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}


export function useTransactionContext() {
    const context = useContext(TransactionContext);
    if (!context) {
        throw new Error ('TransactionContext must be used within a TransactionProvider');
    }
    return context;
}