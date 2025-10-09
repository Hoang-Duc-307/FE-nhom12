import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";


import AdminComponent from './AdminComponent/AdminComponent';
import './AdminLayout.css'
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
                    <div className="admin-header d-flex justify-content-between align-items-center mb-4">
                        <h3 className="m-0">Dashboard Quản lý</h3>
                        <div className="admin-actions">
                            {/* future buttons (export, add quick) */}
                        </div>
                    </div>
                    <div className="admin-card p-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;