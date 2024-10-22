import { Button, Title } from "@/src/features";
import { AddModal, TaxCard } from "./components";
import { Pagination } from "@/src/features";
import { useEffect, useState } from "react";
import { Tax } from "./types";
import { axiosInstance } from "@/src/api/axiosClient";

export default function TaxPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [taxes, setTaxes] = useState<Tax[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    
    const refreshTaxData = async () => {
        try {
            const response = await axiosInstance.get(`/tax?page=${currentPage}&limit=9`);
            const taxData = Object.values(response.data.data.taxes);
            setTaxes(taxData as Tax[]);
            
            const meta = response.data.data.meta;
            setTotalPages(meta.total_pages);  // Set total pages
            setCurrentPage(Number(meta.current_page));  // Set current page
        } catch (error) {
            console.error("Error fetching tax data:", error);
        }
    };

    useEffect(() => {
        refreshTaxData();
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleModalOpen = () => {
        setIsAddModalOpen(true);
    };

    const handleModalClose = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 gap-6">
                    <Title
                        title= "Tax and Service"
                    />
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
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>

                    {/* TAX CARD */}
                    <TaxCard taxes={taxes} />
                </div>

                {/* Add Modal */}
                <AddModal
                    isAddModalOpen={isAddModalOpen}
                    handleModalClose={handleModalClose}
                    refreshTaxData={refreshTaxData}
                />
            </div>
        </div>
    );
}
