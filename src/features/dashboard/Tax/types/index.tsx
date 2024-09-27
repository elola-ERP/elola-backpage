export type Meta = {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    totalItems: number;
};

export type TaxProps = {
    taxes: any[];
    meta: Meta | null;
};