import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '@/src/api/axiosClient';
import { Meta } from '../features/dashboard/Tax/types';

// Define the initial state
interface TaxState {
    taxes: any[];
    meta: Meta | null;
    loading: boolean;
    error: string | null;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
    isDeleteModalOpen: boolean;
    selectedTax: any | null;
}

const initialState: TaxState = {
    taxes: [],
    meta: null,
    loading: false,
    error: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    selectedTax: null,
};

// Async thunk to fetch taxes
// export const fetchTaxes = createAsyncThunk('tax/fetchTaxes', async (page: number) => {
//     const response = await axiosInstance.get(`/tax`, {
//         params: { page, limit: 10 },
//     });
//     console.log('redux state')
//     return response.data.data;
// });

// Add, Edit, Delete thunks
// export const addTax = createAsyncThunk('tax/addTax', async (newTax: any) => {
//     const response = await axiosInstance.post('/tax', newTax);
//     return response.data;
// });

// export const editTax = createAsyncThunk('tax/editTax', async (updatedTax: any) => {
//     const response = await axiosInstance.put(`/tax/${updatedTax.id}`, updatedTax);
//     return response.data;
// });

// export const deleteTax = createAsyncThunk('tax/deleteTax', async (id: number) => {
//     const response = await axiosInstance.delete(`/tax/${id}`);
//     return response.data;
// });

// Slice
const taxSlice = createSlice({
    name: 'tax',
    initialState: {
        taxes: [],
        meta: { currentPage: 1, totalPages: 1, itemsPerPage: 10, totalItems: 0 },
        loading: false,
        error: null,
        isAddModalOpen: false,
    },
    reducers: {
        setTaxes: (state, action) => {
            state.taxes = action.payload.taxes;
            state.meta = action.payload.meta;
        },
        openAddModal: (state) => {
            state.isAddModalOpen = true;
        },
        closeAddModal: (state) => {
            state.isAddModalOpen = false;
        },
        // openEditModal: (state, action) => {
        //     state.isEditModalOpen = true;
        //     state.selectedTax = action.payload;
        // },
        // closeEditModal: (state) => {
        //     state.isEditModalOpen = false;
        //     state.selectedTax = null;
        // },
        // openDeleteModal: (state, action) => {
        //     state.isDeleteModalOpen = true;
        //     state.selectedTax = action.payload;
        // },
        // closeDeleteModal: (state) => {
        //     state.isDeleteModalOpen = false;
        //     state.selectedTax = null;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchTaxes.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(fetchTaxes.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.taxes = action.payload.taxes;
    //             state.meta = action.payload.meta;
    //         })
    //         .addCase(fetchTaxes.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.error.message || 'Failed to fetch taxes';
    //         })
    //         .addCase(addTax.fulfilled, (state, action) => {
    //             state.taxes.push(action.payload); // Add new tax
    //         })
    //         .addCase(editTax.fulfilled, (state, action) => {
    //             const index = state.taxes.findIndex((tax) => tax.id === action.payload.id);
    //             if (index !== -1) {
    //                 state.taxes[index] = action.payload; // Update the tax
    //             }
    //         })
    //         .addCase(deleteTax.fulfilled, (state, action) => {
    //             state.taxes = state.taxes.filter((tax) => tax.id !== action.payload.id); // Remove the deleted tax
    //         });
    // },
);

export const {
    setTaxes,
    openAddModal,
    closeAddModal,
    // openEditModal,
    // closeEditModal,
    // openDeleteModal,
    // closeDeleteModal,
} = taxSlice.actions;

export default taxSlice.reducer;
