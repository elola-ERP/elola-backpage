import { Button, CancelButton, Modal, } from "@/src/features";
import ToggleSwitch from "@/src/features/base/toggleSwitch";
import { editModalProps } from "./types";

export default function EditModal({isEditModalOpen, handleModalClose, formData, setFormData, handleInputChange, errors, handleConfirmEdit}: editModalProps) {
    return (
        <div>
            <Modal isOpen={isEditModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                <div className="w-full flex flex-col items-center pb-10">
                    <h2 className="text-2xl font-bold text-orange-2">Edit Tax</h2>
                    <span className="text-sm text-gray-3">Edit necesary data</span>
                </div>
                <form className="w-full text-center mb-6">
                    <label>Name</label>
                    <input
                        type="text"
                        name="tax_name"
                        placeholder="Enter title name"
                        value={formData.tax_name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                    />

                    <label>Type</label>
                    <select
                        name="tax_type"
                        value={formData.tax_type}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                    >
                        <option value="">Select Type</option>
                        <option value="VAT">VAT</option>
                        <option value="Service">Service</option>
                    </select>

                    <label>Tax Value (%)</label>
                    <input
                        type="number"
                        name="tax_value"
                        min="0"
                        max="100"
                        placeholder="Enter tax value"
                        value={formData.tax_value}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                    />
                    {errors.tax_value && <p className="text-red-600 text-sm">{errors.tax_value}</p>}

                    <label>Tax Status</label>   
                    <div className="flex w-full justify-center">
                        <ToggleSwitch
                            checked={formData.tax_status}
                            onChange={() => setFormData({ ...formData, tax_status: !formData.tax_status })}
                        />
                    </div>
                </form>
                <div className="flex justify-between w-full mt-4 gap-2">
                    <CancelButton
                        onClick={handleModalClose}
                    >
                        Cancel
                    </CancelButton>
                    <Button
                        onClick={handleConfirmEdit}
                    >
                        Ok
                    </Button>
                </div>
            </Modal>
        </div>
    );
};
