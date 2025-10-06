import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as productSlice from "../../../redux/Slice/productSlice";

import EditProductModal from "./EditProductModal";
import "./ListProduct.css"

const ListProduct = () => {
    const {list, loading, error, searchList} = useSelector((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const dispatch = useDispatch();

    const displayList = searchKeyword.trim() ? searchList : list;

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchKeyword(value); // cập nhật input ngay

        if (value.trim() !== "") {
            dispatch(productSlice.searchProducts(value)); // gọi API tìm kiếm ngay
        } else {
            dispatch({type: "products/clearSearch"}); // reset nếu input rỗng
        }
    };


    // Hàm sửa
    const onEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        // console.log(isModalOpen);
    };

    // Hàm xoá
    const onDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            dispatch(productSlice.deleteProduct(id));
        }
    };

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (<div id="list-product">
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>

            {/* Realtime Search */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    placeholder="Nhập tên sản phẩm..."
                    className="border border-gray-300 px-2 py-1 rounded search"
                />
                <span className="text-sm text-gray-600 search1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px"
                         viewBox="0 -960 960 960" width="20px"
                         fill="#1f1f1f">
                        <path
                            d="M760.38-177.85 522.92-415.31q-30 23.54-65.79 36.04-35.79 12.5-71.56 12.5-87.13 0-148.2-61.03-61.06-61.03-61.06-148.07 0-87.05 61.03-148.21 61.03-61.15 148.07-61.15 87.05 0 148.21 61.06 61.15 61.07 61.15 148.2 0 38.08-13.27 73.87-13.27 35.79-35.27 63.48l237.46 237.47-23.31 23.3ZM385.54-398.77q74.61 0 125.92-51.31 51.31-51.3 51.31-125.92t-51.31-125.92q-51.31-51.31-125.92-51.31-74.62 0-125.92 51.31-51.31 51.3-51.31 125.92t51.31 125.92q51.3 51.31 125.92 51.31Z"/>
                    </svg>
                </span>

            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Id</th>
                    <th className="border border-gray-300 px-4 py-2">Tên món</th>
                    <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                    <th className="border border-gray-300 px-4 py-2">Giá</th>
                    <th className="border border-gray-300 px-4 py-2">Mô tả</th>
                    <th className="border border-gray-300 px-4 py-2">Đơn vị</th>
                    <th className="border border-gray-300 px-4 py-2">Kích cỡ</th>
                    <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                    <th className="border border-gray-300 px-4 py-2">Phân loại</th>
                    <th className="border border-gray-300 px-4 py-2">Chi tiết phân loại</th>
                    <th className="border border-gray-300 px-4 py-2">Hành động</th>
                </tr>
                </thead>
                <tbody>
                {displayList && displayList.length > 0 ? (displayList.map((item, index) => (<tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.ten_mon}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <img
                            src={`http://localhost:8080/images/${item.anh}`}
                            alt={item.ten_mon}
                            className="w-16 h-16 object-cover"
                        />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{item.gia}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.mo_ta}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.don_vi}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.kich_co}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.trang_thai}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.phan_loai}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.chi_tiet_phan_loai}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                            className="btn btn-primary "
                            onClick={() => onEdit(item)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                                 width="20px" fill="#1f1f1f">
                                <path
                                    d="M216-216h37.92l411.93-411.92-37.93-37.93L216-253.92V-216Zm-32 32v-83.77l497.23-498.77q5.15-5.48 10.91-7.47 5.76-1.99 11.99-1.99 6.22 0 11.78 1.54 5.55 1.54 11.94 7.15l38.69 37.93q5.61 6.38 7.54 12 1.92 5.63 1.92 11.79 0 6.58-2.26 12.59-2.26 6.02-7.2 11L267.77-184H184Zm560.77-521.31-39.46-39.46 39.46 39.46Zm-98.22 58.76-18.63-19.3 37.93 37.93-19.3-18.63Z"/>
                            </svg>
                        </button>
                        <button
                            className="btn btn-primary "
                            onClick={() => onDelete(item.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960"
                                 width="20px" fill="#1f1f1f">
                                <path
                                    d="M336.62-184q-23.55 0-40.09-16.53Q280-217.07 280-240.62V-696h-48v-32h152v-38.77h192V-728h152v32h-48v454.95Q680-216 663.85-200q-16.15 16-40.47 16H336.62ZM648-696H312v455.38q0 10.77 6.92 17.7 6.93 6.92 17.7 6.92h286.76q9.24 0 16.93-7.69 7.69-7.69 7.69-16.93V-696ZM416.31-288h32v-336h-32v336Zm95.38 0h32v-336h-32v336ZM312-696v480-480Z"/>
                            </svg>
                        </button>
                    </td>
                </tr>))) : (<tr>
                    <td colSpan="9" className="text-center py-4">
                        Không có sản phẩm nào
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>

        {isModalOpen && (<EditProductModal
            isOpen={isModalOpen}
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}  // để đóng modal
        />)}
    </div>);
};

export default ListProduct;

