import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/src/api/axiosClient';

export const fetchTaxesServerSide = createAsyncThunk('taxes/fetchTaxesServerSide',
    async (page: number) => {
        const response = await axiosInstance.get(`/tax`, {
            params: { page, limit: 10 },
        });
        return response.data;
    }
);

const taxSlice = createSlice({
    name: 'taxes',
    initialState: {
        taxes: [],
        currentPage: 1,
        totalPages: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaxesServerSide.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTaxesServerSide.fulfilled, (state, action) => {
                state.taxes = action.payload.taxes;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchTaxesServerSide.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default taxSlice.reducer;
