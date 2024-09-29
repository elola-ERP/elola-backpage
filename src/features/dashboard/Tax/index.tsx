import { Button } from "@/src/features";
import Loader from "../../base/Loader";
import { AddModal, TaxTable } from "./components";
import { Pagination } from "@/src/features";
import { TaxProps } from "./types";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { axiosInstance } from "@/src/api/axiosClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies['authToken']; // Access token from cookies sent in the request
    const page = context.query.page || 1;
    const limit = 10;

    if (!token) {
        // Handle missing token or unauthorized access
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const res = await axiosInstance.get(`https://salemate-be-production.up.railway.app/tax?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            },
        });

        const result = res.data;  // Make sure this response has your expected format
        return {
            props: {
                initialTaxes: result.data.taxes,
                initialMeta: result.data.meta,
            },
        };

    } catch (error) {
        console.error("Error fetching tax data:", error);

        return {
            props: {
                initialTaxes: [],
                initialMeta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 },
            },
        };
    }
};


export default function TaxPage({ initialTaxes = [], initialMeta }: TaxProps) {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
                            currentPage={initialMeta?.currentPage || 1}
                            totalPages={initialMeta?.totalPages || 1}
                            handlePageChange={handlePageChange}
                        />
                    </div>

                    {/* Display Tax Data or Error Message */}
                    <div>
                        {initialTaxes.length === 0 ? (
                            <div>No taxes found.</div>
                        ) : (
                            initialTaxes.map((tax: any) => (
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
