import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axiosClient";
import { fetchTaxData } from "../features/dashboard/Tax/api";
import { Meta, Tax } from "../features/dashboard/Tax/types";

// Define initial state with types
interface TaxState {
    taxes: Tax[];
    meta: Meta;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // status types
    error: string | null;
}

const initialState: TaxState = {
    taxes: [],
    meta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 9 },
    status: 'idle',
    error: null,
};

// Fetch taxes with a delay for skeleton loading
// Fetch taxes with a delay for skeleton loading
export const fetchTaxes = createAsyncThunk<{ taxes: Tax[]; meta: Meta }, number>(
    'taxes/fetchTaxes',
    async (page: number) => {
        const result = await fetchTaxData(page, 9);
        return { 
            taxes: result.data.taxes, // Extract taxes from response
            meta: result.data.meta // Extract meta from response
        };
    }
);

// Add tax action
export const addTax = createAsyncThunk<Tax, FormData, { rejectValue: { message: string } }>(
    'taxes/addTax',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/tax', formData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.response?.data?.message || 'Unknown error occurred' });
        }
    }
);

// Create the slice
const taxSlice = createSlice({
    name: 'taxes',
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.meta.currentPage = action.payload;
        },
        // You can add more reducers here for adding, editing, and deleting taxes
    },
    extraReducers: (builder) => {
        builder
        // Fetch taxes
        .addCase(fetchTaxes.pending, (state) => {
            state.status = 'loading';
            state.taxes = []; // Clear old taxes immediately to avoid flashing old data
        })
        .addCase(fetchTaxes.fulfilled, (state, action: PayloadAction<{ taxes: Tax[]; meta: Meta }>) => {
            state.status = 'succeeded';
            state.taxes = action.payload.taxes; // Update taxes from payload
            state.meta = action.payload.meta; // Update meta from payload
        })
        .addCase(fetchTaxes.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || 'Failed to fetch taxes';
        })

        // Add taxes
        .addCase(addTax.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(addTax.fulfilled, (state, action: PayloadAction<Tax>) => {
            state.status = 'succeeded';
            state.taxes.push(action.payload); // Add the newly created tax to the list
        })
        .addCase(addTax.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload?.message || 'Failed to add tax'; // Store error message if available
        });
}
});

// Export actions and reducer
export const { setCurrentPage } = taxSlice.actions;
export default taxSlice.reducer;