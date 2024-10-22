export type TaxCardProps = {
    taxData: {
        id: string;
        tax_name: string;
        tax_type: string;
        tax_value: number;
        service_value: number;
        tax_status: boolean;
    };
    onEdit: () => void; 
    onDelete: () => void; 
    refreshTaxData?: () => void; 
};