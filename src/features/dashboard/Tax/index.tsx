import { Button } from "@/src/features";
// import Loader from "../../base/Loader";
import { AddModal, TaxTable } from "./components";
import { Pagination } from "@/src/features";
// import { TaxProps } from "./types";
// import { GetServerSideProps } from "next";
import { axiosInstance } from "@/src/api/axiosClient";
import { useState } from "react";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const page = context.query.page || 1;
//     const limit = 10;

//     try {
//         const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
//         const result = res.data;  // Make sure this response has your expected format

//         // Log the entire result object to the console
//         console.log("SSR Fetched Data:", result); // Pretty print the response
//         alert("SSR data fetched successfully!");

//         return {
//             props: {
//                 initialTaxes: result.data.taxes,
//                 initialMeta: result.data.meta,
//             },
//         };

//     } catch (error) {
//         console.error("Error fetching tax data:", error);

//         return {
//             props: {
//                 initialTaxes: [],
//                 initialMeta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 },
//             },
//         };
//     }
// };
interface TaxPageProps {
    result: {
        taxes: Array<any>,
        meta: {
            currentPage: number,
            totalPages: number,
            totalItems: number,
            itemsPerPage: number,
        }
    }
}

export default function TaxPage({ message }: { message: string }) {
    // const [initialTaxes, setInitialTaxes] = useState([]);
    // const [initialMeta, setInitialMeta] = useState({ currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 });
    // const [isLoading, setIsLoading] = useState(true);
    // const [error, setError] = useState(null);
    
    // const { 
    //     taxes = [], 
    //     meta = { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 } 
    // } = result || {};
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // useEffect(() => {
    //     const fetchTaxData = async () => {
    //         const page = 1; // You can change this if you implement pagination logic
    //         const limit = 10;

    //         try {
    //             setIsLoading(true);
    //             const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
    //             const result = res.data;
    //             console.log("CSR Fetched Data:", result); // Log the fetched data

    //             setInitialTaxes(result.data.taxes);
    //             setInitialMeta(result.data.meta);
    //         } catch (error) {
    //             console.error("Error CSR fetching tax data:", error)
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchTaxData();
    // }, []);

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
                        {/* <Pagination 
                            currentPage={meta?.currentPage || 1}
                            totalPages={meta?.totalPages || 1}
                            handlePageChange={(page) => console.log("Page change triggered to:", page)}
                        /> */}
                    </div>

                    {/* Display Tax Data or Error Message */}
                    <div>
                        <div>
                            <h1>SSR Test</h1>
                            <p>{message}</p>
                        </div>
                        {/* {taxes.length === 0 ? (
                            <div>No taxes found.</div>
                        ) : (
                            taxes.map((tax: any) => (
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
                        )} */}
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

// export async function getServerSideProps() {
//     console.log("SSR function started");
//     const page = 1;
//     const limit = 10;

//     try {
//         const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
//         const result = res.data;  // Ensure the correct data format here
//         console.log("SSR fetching data", result);

//         return { 
//             props: { 
//                 result: result?.data || { 
//                     taxes: [], 
//                     meta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
//                 },  // Pass only the necessary data
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching SSR data:", error);
//         return {
//             props: {
//                 result: {
//                     taxes: [], 
//                     meta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 }
//                 }
//             }
//         };
//     }
// }

export async function getServerSideProps() {
    console.log("SSR function started in Test Page");
    
    return {
        props: {
            message: "SSR is working!",
        },
    };
}