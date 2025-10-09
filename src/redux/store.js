import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
import enumsReducer from "./Slice/enumsSlice";
import ordersReducer from "./Slice/orderSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        enums: enumsReducer,
        orders: ordersReducer,
    },
});

export default store;


