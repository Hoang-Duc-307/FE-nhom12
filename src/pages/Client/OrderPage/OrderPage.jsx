import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import "./OrderPage.css"

const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [activeCategoryOrder, setActiveCategoryOrder] = useState(null);

    const {clineList} = useSelector((state) => state.products); // list sản phẩm từ DB
    const {enumList} = useSelector((state) => state.enums);

    const [activeSubCategoryOrder, setActiveSubCategoryOrder] = useState(null); // Level2

    const level2Keys = enumList?.CategoryLevel2 ? Object.keys(enumList.CategoryLevel2) : [];

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
                    c.ten_mon === item.ten_mon ? {...c, qty: c.qty + 1} : c
                )
            );
        } else {
            setCart([...cart, {...item, qty: 1}]);
        }
    };

    const totalQty = cart.reduce((sum, c) => sum + c.qty, 0);
    const totalPrice = cart.reduce((sum, c) => sum + c.gia * c.qty, 0);

    // Tăng số lượng
    const increaseQty = (item) => {
        setCart(
            cart.map((c) =>
                c.ten_mon === item.ten_mon ? {...c, qty: c.qty + 1} : c
            )
        );
    };

    // Giảm số lượng
    const decreaseQty = (item) => {
        setCart(
            cart
                .map((c) =>
                    c.ten_mon === item.ten_mon ? {...c, qty: c.qty - 1} : c
                )
                .filter((c) => c.qty > 0) // Xóa nếu qty = 0
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
                                                {dish.gia} đ
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
                                                    onClick={() => decreaseQty(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="badge bg-light text-dark me-2">
                        {item.qty}
                      </span>
                                                <button
                                                    className="btn btn-sm btn-outline-warning me-2"
                                                    onClick={() => increaseQty(item)}
                                                >
                                                    +
                                                </button>
                                                {item.ten_mon}
                                            </div>
                                            <div className="text-end">
                      <span className="text-warning fw-bold">
                        {(item.gia * item.qty).toLocaleString()}đ
                      </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between fw-bold border-top pt-2">
                                    <span>Thành tiền {totalQty} phần</span>
                                    <span>{totalPrice.toLocaleString()}đ</span>
                                </div>

                                <button className="btn btn-warning w-100 mt-3 text-white fw-bold">
                                    Tiếp tục
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;