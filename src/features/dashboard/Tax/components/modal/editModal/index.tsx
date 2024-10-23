import { axiosInstance } from "@/src/api/axiosClient";
import { Button, CancelButton, Modal } from "@/src/features";
import ToggleSwitch from "@/src/features/base/toggleSwitch";
import { useState } from "react";
import DeleteModal from "../deleteModal";
import { editModalProps, TaxFormData } from "./types";

export default function EditModal({
    isEditModalOpen,
    handleModalClose,
    refreshTaxData,
    taxData,
}: editModalProps) {
    const initialFormData: TaxFormData  = taxData || {
        tax_id: 0,
        tax_name: '',
        tax_type: '',
        tax_value: 0,
        service_value: 0,
        tax_status: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showResult, setShowResult] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (name === "tax_type") {
            setFormData(prevState => ({
                ...prevState,
                tax_type: value,  // Update tax_type
                tax_value: value === "vat" ? 0 : prevState.tax_value,  // Keep tax_value if type is 'vat'
                service_value: value === "service" ? 0 : prevState.service_value,  // Keep service_value if type is 'service'
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === "number" ? Number(value) : value,
            }));
        }
    };

    const handleUpdateTax = async (e: React.MouseEvent) => {
        const newErrors: string[] = [];
        
        if (formData.tax_type === 'vat' && formData.tax_value === 0) {
            newErrors.push("VAT value cannot be 0.");
        }

        if (formData.tax_type === 'service' && formData.service_value === 0) {
            newErrors.push("Service value cannot be 0.");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }
        
        const updatedData: Partial<TaxFormData> = {};
        if (formData.tax_name !== initialFormData.tax_name) updatedData.tax_name = formData.tax_name;
        if (formData.tax_type !== initialFormData.tax_type) updatedData.tax_type = formData.tax_type;
        if (formData.tax_value !== initialFormData.tax_value) updatedData.tax_value = formData.tax_value;
        if (formData.service_value !== initialFormData.service_value) updatedData.service_value = formData.service_value;
        if (formData.tax_status !== initialFormData.tax_status) updatedData.tax_status = formData.tax_status;
        
        try {
            console.log("Form Data:", formData);
            await axiosInstance.patch(`/tax/${taxData.tax_id}`, updatedData); // Assuming taxData has an `id`
            setLoading(true);
            setShowResult(true);
            setErrors([]);
            if (refreshTaxData) {
                refreshTaxData();
            }
        } catch (error: any) {
            setLoading(false);
            setErrors([error.response?.data?.message || "An error occurred. Please try again."]);
        }
    };

    // Trigger opening the delete confirmation modal
    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    // Handle closing the delete modal without deleting
    const handleCloseDeleteModal = () => {
        setDeleteModalOpen(false);
    };

    // Handle confirmed deletion
    const handleDeleteTax = async () => {
        try {
            await axiosInstance.delete(`/tax/${taxData.tax_id}/soft-delete`);
            handleModalClose();
        } catch (error: any) {
            setErrors([error.response?.data?.message || "An error occurred. Please try again."]);
        } finally {
            setDeleteModalOpen(false);
            if (refreshTaxData) {
                refreshTaxData();
            }
        }
    };

    return (
        <div>
            <Modal isOpen={isEditModalOpen} onClose={handleModalClose} onConfirm={handleUpdateTax}>
                <div className="w-full flex flex-col items-center pb-4">
                    <h2 className="text-2xl font-bold text-orange-2">Edit Tax</h2>
                    <span className="text-sm text-gray-3">Update the tax information</span>
                </div>

                <form className="flex flex-col w-full text-center mb-8 p-4 bg-neutral-100 border border-neutral-200 rounded-xl gap-2">
                    <div className="flex w-full gap-4 mb-2">
                        <div className="w-[5.5rem] bg-neutral-200 rounded-[10px]"></div>
                        <div className="flex flex-col w-full h-full justify-between gap-2">
                            <div className="flex">
                                <label>Name</label> 
                            </div>
                            <input
                                type="text"
                                name="tax_name"
                                placeholder="Enter tax name"
                                value={formData.tax_name}
                                onChange={handleInputChange}
                                className="border text-black border-gray-300 p-1 px-2 w-full rounded-[10px] text-2xl"
                                autoComplete="off"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 p-4 bg-white border border-neutral-200 rounded-lg">
                        <div className="flex flex-col w-2/5 justify-between gap-2">
                            <label>Type</label>
                            <select
                                name="tax_type"
                                value={formData.tax_type}
                                onChange={handleInputChange}
                                className="border h-[40px] border-gray-300 p-1 w-full rounded-[10px] text-xl text-center"
                            >
                                <option value="">Select Type</option>
                                <option value="vat">VAT</option>
                                <option value="service">SERVICE</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-1/4 justify-between">
                            <label>Value</label>
                            <div className="flex gap-1 items-center">
                                {formData.tax_type === 'service' ? (
                                    <>
                                        <input
                                            type="number"
                                            name="service_value"
                                            min={1}
                                            max={99}
                                            step={1}
                                            placeholder="1-99%"
                                            value={formData.service_value}
                                            onChange={handleInputChange}
                                            className="border h-[40px] border-gray-300 p-1 w-full rounded-[10px] text-xl text-center"
                                        />
                                        <span className="text-2xl">%</span>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="number"
                                            name="tax_value"
                                            min={1}
                                            max={99}
                                            step={1}
                                            placeholder="1-99%"
                                            value={formData.tax_value}
                                            onChange={handleInputChange}
                                            className="border h-[40px] border-gray-300 p-1 w-full rounded-[10px] text-xl text-center"
                                        />
                                        <span className="text-2xl">%</span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col w-1/4 justify-between">
                            <label>Tax Status</label>   
                            <div className="flex justify-center">
                                <ToggleSwitch
                                    checked={formData.tax_status}
                                    onChange={() => setFormData({ ...formData, tax_status: !formData.tax_status })}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {errors.length > 0 && (
                    <div className="text-red-600 text-sm mb-4">
                        <ul>
                            {errors.map((err, index) => (
                                <li key={index}>• {err}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex justify-between w-full gap-4">
                    <CancelButton onClick={handleModalClose}>Cancel</CancelButton>
                    <Button onClick={handleUpdateTax} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                    <Button onClick={handleOpenDeleteModal} className="bg-red-500 hover:bg-red-700 text-white">
                        Delete
                    </Button>
                </div>
            </Modal>

            {/* DeleteModal */}
            <DeleteModal
                isDeleteModalOpen={isDeleteModalOpen}
                handleDeleteCancel={handleCloseDeleteModal}
                handleDeleteConfirm={handleDeleteTax}
            />

            {showResult && (
                <Modal isOpen={showResult} onClose={handleModalClose} onConfirm={handleModalClose}>
                    <div className="w-full flex flex-col items-center pb-4">
                        <div className="text-green-2 flex row gap-2 justify-center items-center">
                            <h2 className="text-2xl font-bold">Tax Updated</h2>
                        </div>
                        <span className="text-sm text-gray-3">You can review the updated data</span>
                    </div>
                    <div className="flex w-full justify-center">
                        <Button className="w-2/3" onClick={handleModalClose}>OK</Button>
                    </div>
                </Modal>
            )}

        </div>
    );
}
