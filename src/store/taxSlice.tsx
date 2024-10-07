import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTaxData } from "../features/dashboard/Tax/api";

const initialState = {
    taxes: [],
    meta: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 },
    status: 'idle', // idle, loading, succeeded, failed
    error: null
};

export const fetchTaxes = createAsyncThunk(
    'taxes/fetchTaxes',
    async (page: number, { getState }) => {
        const { meta } = (getState() as any).taxes; // Get the meta state
        await new Promise(resolve => setTimeout(resolve, 500)); // Set Timeout for skeleton .5 second
        const result = await fetchTaxData(page, meta.itemsPerPage);
        return result.data; // Return the data to be handled by extraReducers
    }
);

// Create the slice
const taxSlice = createSlice({
    name: 'taxes',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.meta.currentPage = action.payload;
        },
        // You can add more reducers here for adding, editing, and deleting taxes
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaxes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTaxes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.taxes = action.payload.taxes;
                state.meta = action.payload.meta;
            })
            .addCase(fetchTaxes.rejected, (state, action) => {
                state.status = 'failed';
            });
    }
});

// Export actions and reducer
export const { setCurrentPage } = taxSlice.actions;
export default taxSlice.reducer;