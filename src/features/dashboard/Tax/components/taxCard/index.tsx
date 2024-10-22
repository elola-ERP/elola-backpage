import { useState } from "react";
import { Tax } from "../../types";
import { EditModal } from "../modal";

export default function TaxCard({taxes, refreshTaxData}: {taxes: Tax[], refreshTaxData: () => void}) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
    
    const colorThemes = [
        { cardBG: "bg-purple-3", textColor: "text-purple-1", headerBg: "bg-purple-2/50" },
        { cardBG: "bg-green-3", textColor: "text-green-1", headerBg: "bg-green-2/50" },
        { cardBG: "bg-red-200", textColor: "text-red-400", headerBg: "bg-red-400/50" },
        { cardBG: "bg-orange-3", textColor: "text-orange-1", headerBg: "bg-orange-2/50" },
    ];

    const openEditModal = (tax: Tax) => {
        setSelectedTax(tax);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTax(null);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {taxes.map((tax: Tax, index: number) => {
                const theme = colorThemes[index % colorThemes.length];
                return (
                    <div key={tax.tax_id} className={`p-3 ${theme.cardBG} rounded-[5px] flex flex-col`}>
                        <div className="flex w-full justify-between pb-3">
                            <div className={`flex items-center ${theme.textColor} gap-2`}>
                                <div className={`flex text-xl sm:text-2xl lg:text-3xl font-bold items-center justify-center ${theme.headerBg} h-12 w-12 rounded-[5px]`}>
                                    <h1>{tax.tax_id}</h1>
                                </div>
                                <div className={theme.textColor}>
                                    <p className="text-xs -mb-1">Tax Name</p>
                                    <h1 className="text-lg sm:text-xl lg:text-3xl font-bold overflow-hidden">{tax.tax_name}</h1>
                                </div>
                            </div>
                            <button
                                className="transition-transform duration-100 ease-in-out flex justify-center scale-100 text-black/35 hover:scale-125"
                                title="Edit Property"
                                onClick={() => openEditModal(tax)}
                            >
                                <svg width="30" height="30" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3491 3.55222L14.6846 2.21589C14.963 1.93748 15.3406 1.78107 15.7344 1.78107C16.1281 1.78107 16.5057 1.93748 16.7841 2.21589C17.0625 2.4943 17.2189 2.87191 17.2189 3.26564C17.2189 3.65937 17.0625 4.03698 16.7841 4.31539L8.37742 12.7221C7.95888 13.1404 7.44275 13.4478 6.87563 13.6167L4.75 14.25L5.38333 12.1244C5.55218 11.5573 5.85963 11.0411 6.27792 10.6226L13.3491 3.55222ZM13.3491 3.55222L15.4375 5.64064M14.25 11.0833V14.8438C14.25 15.3162 14.0623 15.7692 13.7283 16.1033C13.3942 16.4373 12.9412 16.625 12.4688 16.625H4.15625C3.68383 16.625 3.23077 16.4373 2.89672 16.1033C2.56267 15.7692 2.375 15.3162 2.375 14.8438V6.53126C2.375 6.05885 2.56267 5.60578 2.89672 5.27173C3.23077 4.93768 3.68383 4.75001 4.15625 4.75001H7.91667"
                                        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex p-2 justify-between rounded-xl bg-white/75 text-sm">
                            <div className="flex w-2/5 flex-col justify-between overflow-hidden">
                                <h1>Type :</h1>
                                <p className="text-lg sm:text-xl lg:text-3xl font-bold uppercase text-neutral-700">
                                    {tax.tax_type}
                                </p>
                            </div>
                            <div className="flex w-2/5 flex-col justify-between overflow-hidden px-2">
                                <h1>Value :</h1>
                                <p className="text-lg sm:text-xl lg:text-3xl font-bold text-neutral-700">
                                    {tax.tax_type === 'service' ? tax.service_value : tax.tax_value || "0"}%
                                </p>
                            </div>
                            <div className="flex flex-col w-1/5 justify-between items-end">
                                <h1>Status :</h1>
                                <p className="text-lg sm:text-xl lg:text-3xl font-semibold uppercase">
                                    {tax.tax_status ? 
                                        <span className="flex w-full px-5 bg-green-500 text-white rounded">On</span> : 
                                        <span className="flex w-full px-5 bg-red-500 text-white rounded">Off</span>
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex pt-2 text-xs sm:text-sm lg:text-base justify-between font-semibold text-black/25">
                            <div className="flex flex-col">
                                <h1>Created At :</h1>
                                <p className="font-bold">{new Date(tax.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col items-end">
                                <h1>Last Update :</h1>
                                <p className="font-bold">{new Date(tax.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            {selectedTax && (
                <EditModal
                    taxData={selectedTax}
                    isEditModalOpen={isEditModalOpen}
                    handleModalClose={closeEditModal}
                    formData={selectedTax}
                    setFormData={setSelectedTax}
                    handleInputChange={(e: any) =>
                        setSelectedTax({ ...selectedTax, [e.target.name]: e.target.value })
                    }
                    errors={{}}
                    handleConfirmEdit={() => {
                        closeEditModal();
                    }}
                    refreshTaxData={refreshTaxData}
                />
            )}
        </div>
    )
};

