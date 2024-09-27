import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosInstance } from '@/src/api/axiosClient';
import { Meta } from '../features/dashboard/Tax/types';

// Define the initial state
interface TaxState {
    taxes: any[];
    meta: Meta | null;
    loading: boolean;
    error: string | null;
}

const initialState: TaxState = {
    taxes: [],
    meta: null,
    loading: false,
    error: null,
};

// Async thunk to fetch taxes
export const fetchTaxes = createAsyncThunk('tax/fetchTaxes', async (page: number) => {
    const response = await axiosInstance.get(`/tax`, {
        params: { page, limit: 10 },
    });
    return response.data;
});

// Slice
const taxSlice = createSlice({
    name: 'tax',
    initialState,
    reducers: {
        setTaxes: (state, action: PayloadAction<{ taxes: any[], meta: Meta }>) => {
            state.taxes = action.payload.taxes;
            state.meta = action.payload.meta;
        },
        clearTaxes: (state) => {
            state.taxes = [];
            state.meta = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaxes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaxes.fulfilled, (state, action) => {
                state.loading = false;
                state.taxes = action.payload.taxes;
                state.meta = action.payload.meta;
            })
            .addCase(fetchTaxes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setTaxes, clearTaxes } = taxSlice.actions;

export default taxSlice.reducer;
