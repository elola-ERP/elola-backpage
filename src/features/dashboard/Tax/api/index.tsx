import { axiosInstance } from "@/src/api/axiosClient";
import { GetServerSideProps } from "next";
import { TaxProps } from "../types";

export const getTaxServerSideProps: GetServerSideProps<TaxProps> = async (context) => {
    const { page = 1 } = context.query;
    
    try {
        const response = await axiosInstance.get(`/tax`, {
            params: { page, limit: 10 },
        });
        
        console.log("Response Data:", response.data);
        const { taxes, meta } = response.data.data || {}; // Ensure you access response.data.data correctly
        
        // Debugging
        console.log("Fetched Taxes:", taxes);
        console.log("Fetched Meta:", meta);
    

    
        return { 
            props: { 
                taxes: taxes || [], 
                meta: meta || { 
                    currentPage: 1, 
                    totalPages: 1, 
                    itemsPerPage: 10, 
                    totalItems: 0 
                }
            } 
        };
    } catch (error) {
        console.error("Failed to fetch taxes data", error);
    
        return { 
            props: { 
                taxes: [], 
                meta: { 
                    currentPage: 1, 
                    totalPages: 1, 
                    itemsPerPage: 10, 
                    totalItems: 0 
                }
            }
        };
    }
};
