// src/redux/Slice/productSlice.js
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:8080/api";

// Lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/alllistproducts`);
        return response.data;
    }
);


// Lấy danh sách sản phẩm cline
export const fetchProductsCline = createAsyncThunk(
    "productsCline/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/alllistproductscline`);
        return response.data;
    }
);


// lấy 6 sản phẩm nổi bật
export const fetchProduct = createAsyncThunk(
    "product/fetch",
    async () => {
        const response = await axios.get(`${API_BASE}/topproducts`);
        return response.data;
    }
)


// Thêm sản phẩm mới
export const addProduct = createAsyncThunk(
    "products/add",
    async (newProduct) => {
        // console.log(newProduct);
        const response = await axios.post(`${API_BASE}/addproducts`, newProduct, {
            headers: {"Content-Type": "multipart/form-data"},
        });
        return response.data;
    }
);


// sửa sản phẩm
export const editProduct = createAsyncThunk(
    "products/edit",
    async ({id, updatedProduct}) => {
        // console.log(Array.from(updatedProduct.entries()));
        const response = await axios.put(`${API_BASE}/editproduct/${id}`, updatedProduct, {
                headers: {"Content-Type": "multipart/form-data"},
            }
        );
        return response.data;
    }
);


// xoá sản phẩm
export const deleteProduct = createAsyncThunk(
    "products/delete",
    async (id) => {
        const response = await axios.delete(`${API_BASE}/deleteproduct/${id}`);
        return response.data;
    }
);


// tìm kiếm sản phẩm
export const searchProducts = createAsyncThunk(
    "products/search",
    async (keyword) => {
        const response = await axios.get(`${API_BASE}/searchproduct?keyword=${keyword}`);
        return response.data; // { message, data }
    }
);


const productSlice = createSlice({
    name: "products",
    initialState: {
        list: [],
        clineList: [],
        searchList: [],
        topList: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearSearch: (state) => {
            state.searchList = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // fetchProducts
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload.data;
                // console.log(action.payload);
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // fetchProductsCline
            .addCase(fetchProductsCline.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsCline.fulfilled, (state, action) => {
                state.loading = false;
                state.clineList = action.payload.data;
                // console.log(action.payload.data);
            })
            .addCase(fetchProductsCline.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // fetchProduct
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.topList = action.payload.data;
                // console.log(action.payload);
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // addProduct
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // editProduct
            .addCase(editProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(editProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // deleteproduct
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                const deletedId = Number(action.payload.data);
                state.list = state.list.filter(p => p.id !== deletedId);
                // console.log("Xoá thành công, list còn lại:", state.list);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // searchproduct
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchList = action.payload.data;
                // console.log("tìm thành công, list tìm thấy:", state.searchList);
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })


    },
});

export default productSlice.reducer;
