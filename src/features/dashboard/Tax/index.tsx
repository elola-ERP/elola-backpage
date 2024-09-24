import { axiosInstance } from "@/src/api/axiosClient";
import { Button } from "@/src/features";
import Loader from "../../base/Loader";
import { AddModal, EditModal, DeleteModal, TaxTable } from "./components";
import { Pagination } from "@/src/features";
import { useTaxPageHooks } from "./hooks";
import { wrapper } from "@/src/store";
import { fetchTaxesServerSide } from "@/src/store/taxSlice";

export default function TaxPage() {
    const {
        taxes,
        currentPage,
        totalPages,
        formData,
        errors,
        selectedTax,
        loading,
        isAddModalOpen,
        isSecondModalOpen,
        isEditModalOpen,
        isDeleteModalOpen,
        fetchTaxes,
        setFormData,
        validateForm,
        setCurrentPage,
        handleModalOpen,
        setIsAddModalOpen,
        setIsSecondModalOpen,
        handleModalClose,
        handleInputChange,
    } = useTaxPageHooks();

    const handleConfirmAdd = async () => {
        if (!validateForm()) return;

        try {
            const { tax_id, ...dataToSend } = formData;
            await axiosInstance.post(`/tax`, dataToSend);
            await fetchTaxes();
            handleModalClose();
            setIsAddModalOpen(false);
            setIsSecondModalOpen(true);
        } catch (error) {
            console.error("Error adding tax", error);
        }
    };

    const handleConfirmEdit = async () => {
        try {
            const { tax_id, ...dataToSend } = formData;
            if (selectedTax) {
                await axiosInstance.patch(`/tax/${selectedTax.tax_id}`, dataToSend);
                await fetchTaxes();
                handleModalClose();
            }
        } catch (error) {
            console.error("Error editing tax", error);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            if (selectedTax) {
                await axiosInstance.delete(`/tax/${selectedTax.tax_id}`);
                await fetchTaxes();
                handleModalClose();
            }
        } catch (error) {
            console.error("Error deleting tax", error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchTaxes(page);
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full">
                <div className="flex justify-between items-center pt-20 mb-4 gap-6">
                    <div className="text-gray-2">
                        <h2 className="text-xl font-bold">Tax and Service</h2>
                        <p className="text-sm">Check your store taxes, you can add, edit and update</p>
                    </div>
                    <Button className="bg-orange-2 h-full w-48 text-white rounded" onClick={() => handleModalOpen('add', taxes[0])}>+ Add Tax</Button>
                </div>
                <div className="p-4 bg-white border border-gray-6 rounded-[10px] shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl text-gray-2 font-semibold">Tax and Service Data</h2>
                        {/* PAGE */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>

                    {loading ? (
                        <Loader />
                    ) : (
                        <div>
                            <TaxTable
                                taxes={taxes}
                                handleModalOpen={handleModalOpen}
                            />
                        </div>
                    )}
                </div>

                {/* ADD */}
                <AddModal
                    isAddModalOpen={isAddModalOpen}
                    handleModalClose={handleModalClose}
                    handleConfirmAdd={handleConfirmAdd}
                    errors={errors}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                    isSecondModalOpen={isSecondModalOpen}
                />

                {/* EDIT */}
                <EditModal
                    isEditModalOpen={isEditModalOpen}
                    handleModalClose={handleModalClose}
                    handleConfirmEdit={handleConfirmEdit}
                    errors={errors}
                    formData={formData}
                    setFormData={setFormData}
                    handleInputChange={handleInputChange}
                />

                {/* DELETE */}
                <DeleteModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    handleModalClose={handleModalClose}
                    selectedTax={selectedTax}
                    handleConfirmDelete={handleConfirmDelete}
                />
            </div>
        </div>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        try {
            await store.dispatch(fetchTaxesServerSide(1));
            console.log("Success fethcing taxes on server");
            return { props: {} };
        } catch (error) {
            console.error("Error fetching taxes on server:", error)
            return { props: {} };
        }
    }
);
