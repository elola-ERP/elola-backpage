import { axiosInstance } from "@/src/api/axiosClient";

export const fetchTaxData = async (page: number, limit: number) => {
    try {
        const res = await axiosInstance.get(`/tax?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching tax data:", error);
        throw error;
    }
};
