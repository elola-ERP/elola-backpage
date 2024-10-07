import { Button } from "@/src/features";
import { AddModal, TaxCard, TaxCardSkeleton } from "./components";
import { Pagination } from "@/src/features";
import { useEffect, useState } from "react";
// import { fetchTaxData } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { fetchTaxes, setCurrentPage  } from "@/src/store/taxSlice";

export default function TaxPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { taxes, meta, status } = useSelector((state: RootState) => state.taxes);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchTaxes(meta.currentPage));
    }, [meta.currentPage, dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
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

                    {/* TAX CARD */}
                    {status === 'loading' ? (
                        <TaxCardSkeleton /> // Show Skeleton while loading
                    ) : (
                        <TaxCard taxes={taxes} />
                    )}
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
