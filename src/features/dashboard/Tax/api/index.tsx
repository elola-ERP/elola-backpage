import { axiosInstance } from "@/src/api/axiosClient";
import { GetServerSideProps } from "next";
import { TaxProps } from "../types";

export const getTaxServerSideProps: GetServerSideProps<TaxProps> = async (context) => {
    const { page = 1 } = context.query; // Get current page from query, default to 1
    
    try {
        const response = await axiosInstance.get(`/tax`, {
            params: { page, limit: 10 },
        });

        const { taxes, meta } = response.data.data;

        return { props: { 
            taxes: taxes || [], 
            meta: meta || { 
                currentPage: 1, 
                totalPages: 1, 
                itemsPerPage: 10, 
                totalItems: 0 
            }
        }};
    } catch (error) {
        console.error("Failed to fetch taxes data", error);

        return { props: { 
            taxes: [], 
            meta: { 
                currentPage: 1, 
                totalPages: 1, 
                itemsPerPage: 10, 
                totalItems: 0 
            }
        }};
    }
};
