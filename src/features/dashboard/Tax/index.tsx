import { Button } from "@/src/features";
import { AddModal, TaxTable } from "./components";
import { Pagination } from "@/src/features";
import { axiosInstance } from "@/src/api/axiosClient";
import { useEffect, useState } from "react";

interface Tax {
    tax_id: number;
    tax_name: string;
    tax_type: string;
    tax_value: number;
    service_value: number;
    tax_status: boolean;
    created_at: string;
    updated_at: string;
}

interface Meta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

interface TaxPageProps {
    result: {
        taxes: Tax[];
        meta: Meta;
    };
}

// export const getServerSideProps = (async () => {
//     console.log("SSR function started");
//     const page = 1;
//     const limit = 10;

//     try {
//         const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
//         const result = res.data;  // Ensure the correct data format here
//         console.log("SSR fetching data", result);

//         return { 
//             props: { 
//                 result: result.data  
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching SSR data:", error);
//         return {
//             props: {
//                 result: {
//                     taxes: [],  // Ensure taxes is an empty array
//                     meta: { currentPage: 3, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
//                 }
//             }
//         };
//     }
// }) satisfies GetServerSideProps<{ result: TaxPageProps}>

export default function TaxPage() {
    // const { 
    //     taxes = [], // Set default to empty array
    //     meta = { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 } 
    // } = result || {};
    
    const [taxes, setTaxes] = useState([]);
    const [meta, setMeta] = useState({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 });
    const [currentPage, setCurrentPage] = useState(meta.currentPage)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchTaxData = async (page: number) => {
        const limit = meta.itemsPerPage;
        try {
            const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
            const result = res.data;
            console.log("CSR Fetched Data:", result); // Log the fetched data
            
            setTaxes(result.data.taxes);
            setMeta(result.data.meta);
            setCurrentPage(result.data.meta.currentPage)
        } catch (error) {
            console.error("Error CSR fetching tax data:", error)
        } 
    };
        
    useEffect(() => {
        fetchTaxData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        console.log("Page change triggered to:", page);
    };

    const handleModalOpen = () => {
        setIsAddModalOpen(true);
    };

    const handleModalClose = () => {
        setIsAddModalOpen(false);
    };

    const handleConfirmAdd = (newTax: any) => {
        console.log("New tax added:", newTax);
        setIsAddModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 gap-6">
                    <div className="text-gray-2">
                        <h2 className="text-xl font-bold">Tax and Service</h2>
                        <p className="text-sm">Check your store taxes, you can add, edit, and update</p>
                    </div>
                    <Button 
                        className="bg-orange-2 h-full w-48 text-white rounded"
                        onClick={handleModalOpen}
                    >
                        + Add Tax
                    </Button>
                </div>
                <div className="p-4 bg-white border border-gray-6 rounded-[10px] shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-gray-2 font-semibold">Tax and Service Data</h2>
                        <Pagination 
                            currentPage={Number(meta.currentPage)}
                            totalPages={meta.totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>

                    {/* Display Tax Data or Error Message */}
                    <div>
                        {taxes.length === 0 ? (
                            <div>No taxes found.</div>
                        ) : (
                            taxes.map((tax: Tax) => (
                                <div key={tax.tax_id} className="p-2 border-b">
                                    <p>Tax Name: {tax.tax_name}</p>
                                    <p>Tax Type: {tax.tax_type}</p>
                                    <p>Tax Value: {tax.tax_value || "N/A"}</p>
                                    <p>Service Value: {tax.service_value}</p>
                                    <p>Status: {tax.tax_status ? "Active" : "Inactive"}</p>
                                    <p>Created At: {new Date(tax.created_at).toLocaleDateString()}</p>
                                    <p>Updated At: {new Date(tax.updated_at).toLocaleDateString()}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Add Modal */}
                <AddModal
                    isAddModalOpen={isAddModalOpen}
                    handleModalClose={handleModalClose}
                    handleConfirmAdd={handleConfirmAdd}
                />
            </div>
        </div>
    );
}
