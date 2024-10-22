export interface editModalProps {
    isEditModalOpen?: any;
    handleModalClose?: any;
    handleConfirmEdit?: any;
    errors?: any;
    formData?: any;
    setFormData?: any;
    handleInputChange?: any;
    refreshTaxData?: () => void; 
    taxData: any;
}

export type TaxFormData = {
    tax_id: number
    tax_name: string;
    tax_type: string;
    tax_value: number;
    service_value: number;
    tax_status: boolean;
};