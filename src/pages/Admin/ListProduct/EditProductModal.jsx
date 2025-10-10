import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import "./EditProductModal.css";
import * as productSlice from "../../../redux/Slice/productSlice";

const EditProductModal = ({isOpen, onClose, product}) => {
    const {enumList} = useSelector((state) => state.enums);
    const [id, setId] = useState();
    const [formData, setFormData] = useState(null);
    const [phan_loai, setPhanLoai] = useState("");
    const [chi_tiet_phan_loai, setChiTiet] = useState("");
    const [kich_co, setKichCo] = useState([]);
    const [trang_thai, setTrangThai] = useState("hien");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (product && enumList?.CategoryLevel1 && enumList?.CategoryLevel2) {
            setFormData(product);
            // map label cũ -> key
            const phanLoaiKey = Object.entries(enumList.CategoryLevel1)
                .find(([k, v]) => v.label === product.phan_loai)?.[0] || "";
            const chiTietKey = Object.entries(enumList.CategoryLevel2)
                .find(([k, v]) => v.label === product.chi_tiet_phan_loai)?.[0] || "";

            setPhanLoai(phanLoaiKey);
            setChiTiet(chiTietKey);
            setKichCo(product.kich_co ? product.kich_co.split(",") : []);
            setTrangThai(product.trang_thai || "hien");
            setId(product.id);
        }
    }, [product, enumList]);

    if (!isOpen || !formData || !enumList?.CategoryLevel1 || !enumList?.CategoryLevel2) return null;

    const handleKichCoChange = (e) => {
        const {value, checked} = e.target;
        if (checked) setKichCo([...kich_co, value]);
        else setKichCo(kich_co.filter((k) => k !== value));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFormData({...formData, anh: file});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("ten_mon", formData.ten_mon);
        fd.append("gia", formData.gia);
        fd.append("mo_ta", formData.mo_ta);
        fd.append("don_vi", formData.don_vi);
        fd.append("kich_co", kich_co.join(","));
        fd.append("trang_thai", trang_thai);
        fd.append("phan_loai", phan_loai);
        fd.append("chi_tiet_phan_loai", chi_tiet_phan_loai);
        if (formData.anh instanceof File) fd.append("anh", formData.anh);

        const result = await dispatch(productSlice.editProduct({ id, updatedProduct: fd }));

        if (productSlice.editProduct.fulfilled.match(result)) {
            alert("Cập nhật sản phẩm thành công!");
            onClose()
            navigate("/admin"); // chuyển trang
            dispatch(productSlice.fetchProducts()); // load lại danh sách mới
        }
        // console.log("FormData gửi đi:", Array.from(fd.entries()));
    };

    const renderCategoryLevel1 = () =>
        Object.entries(enumList.CategoryLevel1).map(([key, obj]) => (
            <option key={key} value={key}>
                {obj.label}
            </option>
        ));

    const renderCategoryLevel2 = () => {
        if (!phan_loai) return null;
        const parentId = enumList.CategoryLevel1[phan_loai]?.id;
        if (!parentId) return null;
        return Object.entries(enumList.CategoryLevel2)
            .filter(([_, obj]) => obj.parentId === parentId)
            .map(([key, obj]) => (
                <option key={key} value={key}>
                    {obj.label}
                </option>
            ));
    };

    return (
        <div id="editProductModal">
            <div className="modal-overlay">
                <div className="modal-contents">
                    <h2 className="modal-header text-center">Sửa sản phẩm</h2>
                    <form className="p-4 shadow rounded bg-light" onSubmit={handleSubmit}>
                        <div className="mb-1">
                            <label className="form-label">Tên món</label>
                            <input
                                type="text"
                                name="ten_mon"
                                className="form-control"
                                value={formData.ten_mon || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-1">
                            <label className="form-label">Ảnh</label>
                            <input type="file" name="anh" className="form-control" onChange={handleFileChange}/>
                            {formData.anh && !(formData.anh instanceof File) && (
                                <img
                                    src={`http://localhost:8080/images/${formData.anh}`}
                                    alt="preview"
                                    style={{width: 100, marginTop: 10}}
                                />
                            )}
                        </div>

                        <div className="d-flex">
                            <div className="mb-1 me-2">
                                <label className="form-label">Giá</label>
                                <input
                                    type="number"
                                    name="gia"
                                    className="form-control"
                                    value={formData.gia || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-1 me-2">
                                <label className="form-label">Đơn vị</label>
                                <input
                                    type="text"
                                    name="don_vi"
                                    className="form-control"
                                    value={formData.don_vi || ""}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-1 me-2">
                                <label className="form-label">Kích cỡ</label>
                                <div>
                                    {["S", "M", "L"].map((size) => (
                                        <div className="form-check form-check-inline" key={size}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={size}
                                                checked={kich_co.includes(size)}
                                                onChange={handleKichCoChange}
                                            />
                                            <label className="form-check-label">{size}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-1">
                                <label className="form-label">Trạng thái</label>
                                <div>
                                    {["hien", "an"].map((val) => (
                                        <div className="form-check form-check-inline" key={val}>
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="trang_thai"
                                                value={val}
                                                checked={trang_thai === val}
                                                onChange={() => setTrangThai(val)}
                                            />
                                            <label className="form-check-label">{val === "hien" ? "Hiện" : "Ẩn"}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mb-1">
                            <label className="form-label">Mô tả</label>
                            <textarea
                                name="mo_ta"
                                className="form-control"
                                rows="3"
                                value={formData.mo_ta || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="mb-1">
                            <label className="form-label">Phân loại</label>
                            <select
                                className="form-select"
                                value={phan_loai}
                                onChange={(e) => {
                                    setPhanLoai(e.target.value);
                                    setChiTiet("");
                                }}
                            >
                                <option value="" disabled>
                                    Chọn phân loại
                                </option>
                                {renderCategoryLevel1()}
                            </select>
                        </div>

                        {phan_loai && (
                            <div className="mb-1">
                                <label className="form-label">Chi tiết phân loại</label>
                                <select
                                    className="form-select"
                                    value={chi_tiet_phan_loai}
                                    onChange={(e) => setChiTiet(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Chọn chi tiết
                                    </option>
                                    {renderCategoryLevel2()}
                                </select>
                            </div>
                        )}

                        <div className="d-flex mt-3 modal-buttons">
                            <button type="button" className="btn btn-secondary w-50 me-2 btn-close" onClick={onClose}>
                                Đóng
                            </button>
                            <button type="submit" className="btn btn-primary w-50 ms-2 btn-save">
                                Lưu thay đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
