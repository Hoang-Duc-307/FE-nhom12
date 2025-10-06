import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";


import AdminComponent from './AdminComponent/AdminComponent';
import * as enumsSlice from '../redux/Slice/enumsSlice';
import * as productSlice from "../redux/Slice/productSlice";

const AdminLayout = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(enumsSlice.fetchEnums());
        dispatch(productSlice.fetchProducts());
    }, [dispatch]);
    return (
        <div className="container-fluid admin-page">
            <div className="row">
                {/* Cột trái - sidebar */}
                <div className="col-3 sidebar p-3">
                    <AdminComponent />
                </div>

                {/* Cột phải - hiển thị form route con */}
                <div className="col-9 content p-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;