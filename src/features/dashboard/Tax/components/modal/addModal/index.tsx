import { axiosInstance } from "@/src/api/axiosClient";
import { Button, CancelButton, Modal } from "@/src/features";
import ToggleSwitch from "@/src/features/base/toggleSwitch";
import { useState } from "react";
import { addModalProps } from "./types";

export default function AddModal({
    isAddModalOpen, 
    handleModalClose,
    refreshTaxData,
}: addModalProps) {
    const initialFormData = {
        tax_name: '',
        tax_type: '',
        tax_value: 0,
        service_value: 0,
        tax_status: false,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [tempFormData, setTempFormData] = useState(initialFormData); 
    const [showResult, setShowResult] = useState(false); 
    const [errors, setErrors] = useState<string[]>([]); 
    const [loading, setLoading] = useState(false); 


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const handleConfirmAdd = async (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true); 
        const newErrors: string[] = []; 

        if (!formData.tax_name) {
            newErrors.push("Name should not be empty");
        }
        if (!formData.tax_type) {
            newErrors.push("Type must be one of the following values: service, vat");
        }
        if (formData.tax_type === 'vat' && (formData.tax_value < 1 || formData.tax_value > 99)) {
            newErrors.push("VAT Value must be between 1 and 99");
        } else if (formData.tax_type === 'service' && (formData.service_value < 1 || formData.service_value > 99)) {
            newErrors.push("Service Value must be between 1 and 99");
        }

        if (newErrors.length > 0) {
            setLoading(false);
            setErrors(newErrors); 
            return;
        }

        try {
            const response = await axiosInstance.post('/tax', formData);
            setLoading(false); 
            setTempFormData(formData);
            setShowResult(true);
            setErrors([]); 
        } catch (error: any) {
            setLoading(false);
            setErrors([error.response?.data?.message || "An error occurred. Please try again."]);
        }
    };

    const handleOkClick = () => {
        setShowResult(false); 
        handleModalClose();
        setFormData(initialFormData); 
        if (refreshTaxData) {
            refreshTaxData(); 
        }
    };
    
    return (
        <div>
            <Modal isOpen={isAddModalOpen} onClose={handleModalClose} onConfirm={handleConfirmAdd}>
                <div className="w-full flex flex-col items-center pb-4">
                    <h2 className="text-2xl font-bold text-orange-2">Add Tax</h2>
                    <span className="text-sm text-gray-3">Input all necessary data</span>
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
                    <Button onClick={handleConfirmAdd} disabled={loading}>
                        {loading ? "Adding..." : "OK"}
                    </Button>
                </div>
            </Modal>

            <Modal isOpen={showResult} onClose={handleModalClose} onConfirm={handleOkClick}>
                <div className="w-full flex flex-col items-center pb-4">
                    <div className="text-green-2 flex row gap-2 justify-center items-center">
                        <h2 className="text-2xl font-bold">Tax Added</h2>
                    </div>
                    <span className="text-sm text-gray-3">You can update or delete this data later</span>
                </div>
                <div className="flex flex-col w-full text-center mb-6 p-4 bg-green-100 border border-green-300 rounded-xl gap-2">
                    <div className="flex w-full gap-4 mb-2">
                        <div className="w-[4.5rem] bg-green-300/50 rounded-[10px]"></div>
                        <div className="flex flex-col w-full h-full justify-between text-green-700">
                            <div className="flex w-full justify-start">
                                <label>Tax Name</label>
                            </div>
                            <h1 className="-mt-2 text-left text-4xl font-bold">{tempFormData.tax_name}</h1> 
                        </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-white rounded-lg text-left text-neutral-700">
                        <div className="flex flex-col w-full justify-between">
                            <label>Type :</label>
                            <h1 className="text-4xl font-bold uppercase">{tempFormData.tax_type}</h1> 
                        </div>
                        <div className="flex flex-col w-full justify-between">
                            <label>Value :</label>
                            <h1 className="text-4xl font-bold">{tempFormData.tax_type === 'service' ? tempFormData.service_value : tempFormData.tax_value}%</h1>
                        </div>
                        <div>
                            <label>Status :</label>
                            <p className="text-lg sm:text-xl lg:text-3xl font-semibold uppercase">
                                    {tempFormData.tax_status ? 
                                        <span className="flex w-full px-5 bg-green-500 text-white rounded">On</span> : 
                                        <span className="flex w-full px-5 bg-red-500 text-white rounded">Off</span>
                                    }
                                </p>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-center">
                    <Button className="w-2/3" onClick={handleOkClick}>OK</Button>
                </div>
            </Modal>
        </div>
    );
}
