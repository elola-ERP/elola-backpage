export interface Tax {
    tax_id: number;
    tax_name: string;
    tax_type: string;
    tax_value: number | null;
    service_value: number | null;
    tax_status: boolean;
    created_at: string;
    updated_at: string;
}

export interface Meta {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}