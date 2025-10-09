import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import axios from 'axios';
import "./OrderPage.css"
import {formatPrice } from "../../../utils/format"

const OrderPage = () => {
    const [cart, setCart] = useState([]);

    const {clineList} = useSelector((state) => state.products); // list sản phẩm từ DB
    const {enumList} = useSelector((state) => state.enums);

    const [activeSubCategoryOrder, setActiveSubCategoryOrder] = useState(null); // Level2

    const level2Keys = React.useMemo(() => (enumList?.CategoryLevel2 ? Object.keys(enumList.CategoryLevel2) : []), [enumList]);

    useEffect(() => {
        if (!activeSubCategoryOrder && level2Keys.length > 0) {
            const defaultCategory = enumList.CategoryLevel2[level2Keys[0]];

            setActiveSubCategoryOrder(defaultCategory);
        }

    }, [activeSubCategoryOrder, level2Keys, enumList]);

    // lọc sản phẩm theo activeSubCategoryOrder
    const displayList = activeSubCategoryOrder
        ? clineList.filter((item) => item.chi_tiet_phan_loai === activeSubCategoryOrder.label)
        : [];

    const addToCart = (item) => {
        const exist = cart.find((c) => c.ten_mon === item.ten_mon);
        if (exist) {
            setCart(
                cart.map((c) =>
                    c.ten_mon === item.ten_mon ? {...c, sl: c.sl + 1} : c
                )
            );
        } else {
            setCart([...cart, {...item, sl: 1}]);
        }
    };

    const totalsl = cart.reduce((sum, c) => sum + c.sl, 0);
    const totalPrice = cart.reduce((sum, c) => sum + c.gia * c.sl, 0);

    // Checkout state
    const [checkout, setCheckout] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [form, setForm] = useState({ name: '', phoneNumber: '', email: '', notes: '', address: '' });
    const API_BASE = 'http://localhost:8080/api';

    // Tăng số lượng
    const increasesl = (item) => {
        setCart(
            cart.map((c) =>
                c.ten_mon === item.ten_mon ? {...c, sl: c.sl + 1} : c
            )
        );
    };

    // Giảm số lượng
    const decreasesl = (item) => {
        setCart(
            cart
                .map((c) =>
                    c.ten_mon === item.ten_mon ? {...c, sl: c.sl - 1} : c
                )
                .filter((c) => c.sl > 0) // Xóa nếu sl = 0
        );
    };
    return (
        <div>
            <div className="container-fluid order-page">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-2 bg-light sidebar">
                        <h5 className="mt-3">Thực đơn</h5>
                        <ul className="list-unstyled ms-5">
                            {level2Keys.map((key) => (
                                <li
                                    key={key}
                                    className={`py-2 ${activeSubCategoryOrder?.id === enumList.CategoryLevel2[key].id ? "fw-bold text-warning" : ""}`}
                                    role="button"
                                    onClick={() => {
                                        console.log("Click vào key:", key);
                                        console.log("Dữ liệu object:", activeSubCategoryOrder);
                                        setActiveSubCategoryOrder(enumList.CategoryLevel2[key])
                                    }}
                                >
                                    {enumList.CategoryLevel2[key].label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Menu list */}
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Bạn đang cần tìm món gì ?"
                            className="form-control my-3"
                        />
                        <h5>SET</h5>
                        {displayList.length > 0 ? (
                            displayList.map((dish) => (
                                <div
                                    key={dish.id}
                                    className="d-flex align-items-center justify-content-between border-bottom py-2 mx-5"
                                >
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`http://localhost:8080/images/${dish.anh}`}
                                            alt={dish.ten_mon}
                                            width="80"
                                            className="me-3 rounded"
                                        />
                                        <div>
                                            <div>{dish.ten_mon}</div>
                                            <div className="text-warning fw-bold">
                                                {formatPrice(dish.gia)}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline-warning rounded-circle"
                                        onClick={() => addToCart(dish)}
                                    >
                                        +
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>Chưa có món nào trong danh mục này.</p>
                        )}
                    </div>

                    {/* Cart */}
                    <div className="col-4 bg-light p-3">
                        <h5 className="d-flex justify-content-between">
                            <span>Món bạn đã chọn</span>
                            <span role="button" className="text-danger">🗑</span>
                        </h5>

                                {successMsg && <div className="alert alert-success">{successMsg}</div>}
                                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                                {cart.length === 0 ? (
                                    <p className="text-muted">Không có món ăn trong giỏ hàng</p>
                                ) : (
                                    <>
                                {cart.map((item, index) => (
                                    <div key={index} className="card mb-2 shadow-sm">
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => decreasesl(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="badge bg-light text-dark me-2">
                        {item.sl}
                      </span>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => increasesl(item)}
                                                >
                                                    +
                                                </button>
                                                {item.ten_mon}
                                            </div>
                                            <div className="text-end">
                      <span className="text-warning fw-bold">
                        {(item.gia * item.sl).toLocaleString()}đ
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                    <span>Thành tiền {totalsl} phần</span>
                                    <span>{totalPrice.toLocaleString()}đ</span>
                                </div>

                                <button className="btn btn-warning w-100 mt-3 text-white fw-bold" onClick={() => { setCheckout(true); setErrorMsg(null); }}>
                                    Tiếp tục
                                </button>

                                {checkout && (
                                    <div className="checkout-card card mt-3 p-3">
                                        <h5>Thông tin người nhận</h5>
                                        {successMsg ? (
                                            <div className="alert alert-success">{successMsg}</div>
                                        ) : (
                                            <>
                                                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                                                <div className="mb-2">
                                                    <label className="form-label">Tên</label>
                                                    <input className="form-control" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Số điện thoại</label>
                                                    <input className="form-control" value={form.phoneNumber} onChange={(e) => setForm({...form, phoneNumber: e.target.value})} required />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Email (tuỳ chọn)</label>
                                                    <input className="form-control" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Địa chỉ</label>
                                                    <input className="form-control" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label">Ghi chú (tuỳ chọn)</label>
                                                    <textarea className="form-control" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} />
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-primary" disabled={submitting} onClick={async () => {
                                                        // validate
                                                        if (!form.name.trim() || !form.phoneNumber.trim()) {
                                                            setErrorMsg('Vui lòng nhập tên và số điện thoại');
                                                            return;
                                                        }
                                                        setErrorMsg(null);
                                                        setSubmitting(true);
                                                        try {
                                                            const payload = {
                                                                name: form.name,
                                                                phoneNumber: form.phoneNumber,
                                                                email: form.email || null,
                                                                address: form.address || null,
                                                                notes: form.notes || null,
                                                                details: cart.map(c => ({ sanPhamId: c.id, quantity: c.sl, price: Number(c.gia) }))
                                                            };
                                                            const resp = await axios.post(`${API_BASE}/orders`, payload);
                                                            // expect { message, data }
                                                            // show success message first so it's visible to the user
                                                            setSuccessMsg(resp.data?.message || 'Đặt hàng thành công');
                                                            setErrorMsg(null);
                                                            // give React a moment to render the success alert before clearing the cart/closing the form
                                                            setTimeout(() => {
                                                                setCart([]);
                                                                setCheckout(false);
                                                                setForm({ name: '', phoneNumber: '', email: '', notes: '', address: '' });
                                                            }, 200);
                                                        } catch (err) {
                                                            console.error(err);
                                                            setErrorMsg(err.response?.data?.message || 'Lỗi khi gửi order');
                                                        } finally {
                                                            setSubmitting(false);
                                                        }
                                                    }}>Xác nhận đặt hàng</button>
                                                    <button className="btn btn-outline-secondary" onClick={() => setCheckout(false)}>Quay lại</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;