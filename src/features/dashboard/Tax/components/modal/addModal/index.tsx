import { Button, CancelButton, Modal } from "@/src/features";
import ToggleSwitch from "@/src/features/base/toggleSwitch";
import { useState } from "react";
import { addModalProps } from "./types";

export default function AddModal({
    isAddModalOpen, 
    handleModalClose, 
    handleConfirmAdd, 
    // errors, formData, 
    // setFormData, 
    handleInputChange, 
    isSecondModalOpen,
}: addModalProps) {
    const [formData, setFormData] = useState({
        tax_name: '',
        tax_type: '',
        tax_value: 0,
        service_value: 0,
        tax_status: false,
    });
    
    return (
        <div>
            <Modal isOpen={isAddModalOpen} onClose={handleModalClose} onConfirm={handleConfirmAdd}>
                    <div className="w-full flex flex-col items-center pb-10">
                        <h2 className="text-2xl font-bold text-orange-2">Add Tax</h2>
                        <span className="text-sm text-gray-3">Input all necesary data</span>
                    </div>
                    <form className="w-full text-center mb-6">
                        <label>Name</label>
                        {/* {errors.tax_name && <p className="text-red-600 text-sm">{errors.tax_name}</p>} */}
                        <input
                            type="text"
                            name="tax_name"
                            placeholder="Enter title name"
                            value={formData.tax_name}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 mb-4 drop-shadow-md w-full rounded-[10px]"
                        />

                        <label>Type</label>
                        {/* {errors.tax_type && <p className="text-red-600 text-sm">{errors.tax_type}</p>} */}
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
                        {/* {errors.tax_value && <p className="text-red-600 text-sm">{errors.tax_value}</p>} */}
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
                            onClick={
                                () => {alert('not implemented due to error')}
                                // handleConfirmAdd
                            }
                        >
                            Ok
                        </Button>
                    </div>
                </Modal>

                <Modal isOpen={isSecondModalOpen} onClose={handleModalClose} onConfirm={handleModalClose}>
                        <div className="w-full flex flex-col items-center pb-10">
                            <div className="text-green-2 flex row gap-2 justify-center items-center">
                                <svg width="24" height="24" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M10.3333 15.5417L13.4583 18.6667L18.6667 11.375M27 14.5C27 16.1415 26.6767 17.767 26.0485 19.2835C25.4203 20.8001 24.4996 22.1781 23.3388 23.3388C22.1781 24.4996 20.8001 25.4203 19.2835 26.0485C17.767 26.6767 16.1415 27 14.5 27C12.8585 27 11.233 26.6767 9.71646 26.0485C8.19989 25.4203 6.8219 24.4996 5.66116 23.3388C4.50043 22.1781 3.57969 20.8001 2.95151 19.2835C2.32332 17.767 2 16.1415 2 14.5C2 11.1848 3.31696 8.00537 5.66116 5.66117C8.00537 3.31696 11.1848 2 14.5 2C17.8152 2 20.9946 3.31696 23.3388 5.66117C25.683 8.00537 27 11.1848 27 14.5Z" 
                                        stroke="currentColor" 
                                        strokeWidth="4" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"/>
                                </svg>
                                <h2 className="text-2xl font-bold">Tax Added</h2>
                            </div>
                            <span className="text-sm text-gray-3">You can update or delete this data later</span>
                        </div>
                        <div className="text-gray-1 w-full flex flex-col mb-6 gap-6">

                            <div className="flex flex-row gap-4 justify-start">
                                <h2 className="w-1/4 font-bold text-gray-3">Name</h2>
                                <span>:</span>
                                <p>{formData.tax_name}</p> 
                            </div>
                            <div className="flex flex-row gap-4 justify-start">
                                <h2 className="w-1/4 font-bold text-gray-3">Type</h2>
                                <span>:</span>
                                <p>{formData.tax_type}</p> 
                            </div>
                            <div className="flex flex-row gap-4 justify-start">
                                <h2 className="w-1/4 font-bold text-gray-3">Value</h2>
                                <span>:</span>
                                <p>{formData.tax_value}</p> 
                            </div>
                            <div className="flex flex-row gap-4 justify-start">
                                <h2 className="w-1/4 font-bold text-gray-3">Status</h2>
                                <span>:</span>
                                <p>{formData.tax_status ? "ON" : "OFF"}</p> 
                            </div>
                        </div>
                        <Button
                            onClick={handleModalClose}
                        >
                            Ok
                        </Button>
                </Modal>
        </div>
    );
};
