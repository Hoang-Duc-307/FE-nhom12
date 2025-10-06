import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import * as productSlice from "../../../redux/Slice/productSlice";


const AddProductPage = () => {
    const {enumList} = useSelector((state) => state.enums);
    const [phanloai, setPhanLoai] = useState("");
    const [chi_tiet_phan_loai, setChiTiet] = useState("");
    const [kichCo, setKichCo] = useState([]);
    const [trang_thai, setTrangThai] = useState("hien");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Xử lý chọn kích cỡ
    const handleKichCoChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setKichCo([...kichCo, value]);
        } else {
            setKichCo(kichCo.filter((k) => k !== value));
        }
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const formData = new FormData();
        formData.append("ten_mon", form.elements.ten_mon.value);
        formData.append("gia", form.elements.gia.value);
        formData.append("mo_ta", form.elements.mo_ta.value);
        formData.append("don_vi", form.elements.don_vi.value);
        formData.append("kich_co", kichCo.join(","));
        formData.append("trang_thai", trang_thai);

        // Gửi key (VD: DO_AN, COM)
        formData.append("phan_loai", phanloai);
        formData.append("chi_tiet_phan_loai", chi_tiet_phan_loai);

        const file = form.elements.anh.files[0];
        if (file) {
            formData.append("anh", file);
        }
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }
        const result = await dispatch(productSlice.addProduct(formData))

        // kiểm tra thành công
        if (productSlice.addProduct.fulfilled.match(result)) {
            alert("Thêm sản phẩm thành công!");
            navigate("/admin"); // chuyển trang
        }
    };

    // Helper: render CategoryLevel1
    const renderCategoryLevel1 = () => {
        if (!enumList.CategoryLevel1) return null;
        return Object.entries(enumList.CategoryLevel1).map(([key, obj]) => (
            <option key={key} value={key}>
                {obj.label}
            </option>
        ));
    };

    // Helper: render CategoryLevel2 theo phanloai
    const renderCategoryLevel2 = () => {
        if (!phanloai || !enumList.CategoryLevel2) return [];
        return Object.entries(enumList.CategoryLevel2)
            .filter(([_, obj]) => obj.parentId === enumList.CategoryLevel1[phanloai].id)
            .map(([key, obj]) => (
                <option key={key} value={key}>
                    {obj.label}
                </option>
            ));
    };

    return (
        <div className="container">
            <h2 className="mb-4 text-center">Thêm Sản Phẩm</h2>
            <form className="p-4 shadow rounded bg-light" onSubmit={handleSubmit}>
                {/* Tên món */}
                <div className="mb-3">
                    <label className="form-label">Tên món</label>
                    <input type="text" name="ten_mon" className="form-control" required/>
                </div>

                {/* Ảnh */}
                <div className="mb-3">
                    <label className="form-label">Ảnh</label>
                    <input type="file" name="anh" className="form-control"/>
                </div>

                {/* Giá */}
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input type="number" name="gia" className="form-control" required/>
                </div>

                {/* Mô tả */}
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea name="mo_ta" className="form-control" rows="3"></textarea>
                </div>

                {/* Đơn vị */}
                <div className="mb-3">
                    <label className="form-label">Đơn vị</label>
                    <input type="text" name="don_vi" className="form-control"/>
                </div>

                {/* Kích cỡ */}
                <div className="mb-3">
                    <label className="form-label">Kích cỡ</label>
                    <div>
                        {["S", "M", "L"].map((size) => (
                            <div className="form-check form-check-inline" key={size}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={size}
                                    onChange={handleKichCoChange}
                                />
                                <label className="form-check-label">{size}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Trạng thái */}
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="trang_thai"
                                value="hien"
                                checked={trang_thai === "hien"}
                                onChange={() => setTrangThai("hien")}
                            />
                            <label className="form-check-label">Hiện</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="trang_thai"
                                value="an"
                                checked={trang_thai === "an"}
                                onChange={() => setTrangThai("an")}
                            />
                            <label className="form-check-label">Ẩn</label>
                        </div>
                    </div>
                </div>

                {/* Phân loại */}
                <div className="mb-3">
                    <label htmlFor="phanLoai" className="form-label">Phân loại</label>
                    <select
                        className="form-select"
                        id="phanLoai"
                        value={phanloai}
                        onChange={(e) => {
                            setPhanLoai(e.target.value);
                            setChiTiet("");
                        }}
                    >
                        <option value="" disabled>Chọn phân loại</option>
                        {renderCategoryLevel1()}
                    </select>
                </div>

                {/* Chi tiết phân loại */}
                {phanloai && (
                    <div className="mb-3">
                        <label className="form-label">Chi tiết phân loại</label>
                        <select
                            className="form-select"
                            value={chi_tiet_phan_loai}
                            onChange={(e) => setChiTiet(e.target.value)}
                        >
                            <option value="" disabled>Chọn chi tiết</option>
                            {renderCategoryLevel2()}
                        </select>
                    </div>
                )}

                {/* Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Add sản phẩm
                </button>
            </form>
        </div>
    );
};

export default AddProductPage;
