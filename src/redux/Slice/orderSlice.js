import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const fetchOrders = createAsyncThunk(
    "orders/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/orders`);
        return response.data;
    }
);

export const getOrderById = createAsyncThunk(
    "orders/getById",
    async (id) => {
        const response = await axios.get(`${API_BASE}/orders/${id}`);
        return response.data;
    }
);

export const deleteOrder = createAsyncThunk(
    "orders/delete",
    async (id) => {
        const response = await axios.delete(`${API_BASE}/orders/${id}`);
        return response.data;
    }
);

export const updateOrder = createAsyncThunk(
    "orders/update",
    async ({id, payload}) => {
        const response = await axios.put(`${API_BASE}/orders/${id}`, payload);
        return response.data;
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        loading: false,
        error: null,
        current: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(getOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload.data;
            })
            .addCase(getOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = Number(action.payload.data);
                state.list = state.list.filter(o => o.id !== deletedId);
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export default orderSlice.reducer;
