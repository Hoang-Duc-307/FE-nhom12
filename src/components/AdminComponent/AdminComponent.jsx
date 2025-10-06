import React from 'react';
import {NavLink} from "react-router-dom";
import "./AdminComponent.css"
const AdminComponent = () => {
    return (
        <>
            {/* Sidebar */}
            <h4 className="mb-3">Quản lý</h4>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink
                        to="/admin"
                        className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Danh Sách Sản Phẩm
                    </NavLink>
                    <NavLink
                        to="/admin/AddProduct"
                        className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Thêm Sản Phẩm
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/admin/User"
                        className={({isActive}) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Thêm Người Dùng
                    </NavLink>
                </li>
            </ul>
        </>
    );
};

export default AdminComponent;