import { Button } from "@/src/features";
import Loader from "../../base/Loader";
import { AddModal, EditModal, DeleteModal, TaxTable } from "./components";
import { Pagination } from "@/src/features";
import { TaxProps } from "./types";
import { getTaxServerSideProps } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/store/store";
import { useEffect } from "react";
import { fetchTaxes } from "@/src/store/taxSlice";

export const GetServerSideProps = getTaxServerSideProps;

export default function TaxPage({meta}: TaxProps) {
    const dispatch = useDispatch<AppDispatch>();
    const { taxes, loading, error } = useSelector((state: RootState) => state.tax);

    // Fetch taxes when the component mounts
    useEffect(() => {
        dispatch(fetchTaxes(1)); // Fetch for the first page initially
    }, [dispatch]);

    const handlePageChange = (page: number) => {
        dispatch(fetchTaxes(page)); // Dispatch with the new page number
    };

    if (loading) return <Loader />;

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <div className="flex justify-between items-center mb-4 gap-6">
                    <div className="text-gray-2">
                        <h2 className="text-xl font-bold">Tax and Service</h2>
                        <p className="text-sm">Check your store taxes, you can add, edit and update</p>
                    </div>
                    <Button 
                        className="bg-orange-2 h-full w-48 text-white rounded"
                        onClick={() => console.log('button clicked')}
                    >
                        + Add Tax
                    </Button>
                </div>
                <div className="p-4 bg-white border border-gray-6 rounded-[10px] shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-gray-2 font-semibold">Tax and Service Data</h2>
                        {/* PAGE */}
                        <Pagination 
                            currentPage={meta?.currentPage || 1} // Default to page 1 if meta is undefined
                            totalPages={Math.max(meta?.totalPages || 0, 1)} // Ensure at least one page is shown
                            handlePageChange={handlePageChange}                        
                        />  
                    </div>

                    {error ? <div>Error: {error}</div> : (
                        <TaxTable 
                            taxes={taxes} 
                            handleModalOpen={() => {}} 
                        />
                    )}
                    {/* {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            <TaxTable
                                taxes={taxes}
                                handleModalOpen={handleModalOpen}
                            />
                        </div>
                    )} */}
                </div>

                {/* ADD */}
                {/* <AddModal
                    isAddModalOpen={isAddModalOpen}
                    handleModalClose={handleModalClose}
                    handleConfirmAdd={handleConfirmAdd}
                    errors={errors}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    isSecondModalOpen={isSecondModalOpen}
                /> */}

                {/* EDIT */}
                {/* <EditModal
                    isEditModalOpen={isEditModalOpen}
                    handleModalClose={handleModalClose}
                    handleConfirmEdit={handleConfirmEdit}
                    errors={errors}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                /> */}

                {/* DELETE */}
                {/* <DeleteModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    handleModalClose={handleModalClose}
                    selectedTax={selectedTax}
                    handleConfirmDelete={handleConfirmDelete}
                /> */}
            </div>
        </div>
    );
}
