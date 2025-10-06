import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
import enumsReducer from "./Slice/enumsSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        enums: enumsReducer,
    },
});

export default store;


