export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (newPage: number) => void;
}