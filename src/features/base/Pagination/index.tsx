import { useState } from "react";
import { PaginationProps } from "./types";

export default function Pagination({ currentPage, totalPages, handlePageChange }: PaginationProps) {
    const [isDisabled, setIsDisabled] = useState(false);
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    
    const handlePageClick = (page: number) => {
        if (!isDisabled) {
            setIsDisabled(true);
            handlePageChange(page);
            
            setTimeout(() => {
                setIsDisabled(false);
            }, 1500);  // Disable clicking for 1.5 seconds
        }
    };
    
    return (
        <div className="flex items-center gap-2">
            {/* Previous Button */}
            <svg
                onClick={() => currentPage > 1 && handlePageClick(currentPage - 1)}
                className={`cursor-pointer stroke-gray-3 ${currentPage === 1 ? 'opacity-10 cursor-not-allowed' : ''}`}
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M15.75 19.5L8.25 12L15.75 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            
            {/* Page Number Buttons */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`w-6 h-6 flex items-center justify-center rounded ${number === currentPage ? 'bg-orange-2 text-white' : 'bg-gray-6 hover:bg-gray-5'}`}
                >
                    {number}
                </button>
            ))}
            
            {/* Next Button */}
            <svg
                onClick={() => currentPage < totalPages && handlePageClick(currentPage + 1)}
                className={`cursor-pointer stroke-gray-3 ${currentPage === totalPages ? 'opacity-10 cursor-not-allowed' : ''}`}
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M8.25 4.5L15.75 12L8.25 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
}
