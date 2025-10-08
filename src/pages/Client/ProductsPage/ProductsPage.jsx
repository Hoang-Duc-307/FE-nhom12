import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import "./ProductsPage.css";
import ShowProduct from "./ShowProduct";
import {formatPrice} from "../../../utils/format"

const ProductsPage = () => {
    const {clineList} = useSelector((state) => state.products); // list sản phẩm từ DB
    const {enumList} = useSelector((state) => state.enums);
    const [show, setShow] = useState(false);

    const [selectedDish, setSelectedDish] = useState(null);

    // console.log(clineList);
    const [activeCategory, setActiveCategory] = useState(null); // Level1
    const [activeSubCategory, setActiveSubCategory] = useState(null); // Level2

    const level1Keys = enumList?.CategoryLevel1 ? Object.keys(enumList.CategoryLevel1) : [];
    const level2Keys = enumList?.CategoryLevel2 ? Object.keys(enumList.CategoryLevel2) : [];

    // set default active CategoryLevel1 và Level2 đầu tiên
    useEffect(() => {
        if (!activeCategory && level1Keys.length > 0) {
            const defaultCategory = level1Keys[0];
            setActiveCategory(defaultCategory);

            // Chọn Level2 con đầu tiên
            const subCats = Object.values(enumList.CategoryLevel2 || {}).filter(
                (c) => c.parentId === enumList.CategoryLevel1[defaultCategory].id
            );
            setActiveSubCategory(subCats[0] || null);
        }
    }, [activeCategory, level1Keys, enumList]);


    // Lọc danh sách Level2 theo activeCategory
    const subCategories = level2Keys
        .map((key) => enumList.CategoryLevel2[key])
        .filter((c) => c && c.parentId === enumList?.CategoryLevel1?.[activeCategory]?.id);

    // lọc sản phẩm theo activeSubCategory
    const displayList = activeSubCategory
        ? clineList.filter((item) => item.chi_tiet_phan_loai === activeSubCategory.label)
        : [];
    // console.log(activeSubCategory);

    // Khi click Level1: chọn Level1 và tự động chọn Level2 con đầu tiên
    const handleClickLevel1 = (key) => {
        setActiveCategory(key);
        setShow(false);
        // Lấy danh sách Level2 con của Level1
        const subCats = Object.values(enumList.CategoryLevel2 || {}).filter(
            (c) => c.parentId === enumList.CategoryLevel1[key].id
        );

        // Chọn Level2 đầu tiên làm activeSubCategory
        setActiveSubCategory(subCats[0] || null);
    };

    // click sản phẩm phóng to
    const handleClickShow = (dish) => {
        setSelectedDish(dish);
        setShow(true);
    };


    return (
        <div className="container mt-4 d-flex" id="thaydoi">
            {/* Menu Level1 */}
            <div className="menu-list me-4">
                <div className="menu-item menu-title fw-bold mb-2">Danh mục</div>
                {level1Keys.map((key) => (
                    <div key={key}>
                        {/* Level1 */}
                        <div
                            className={`menu-item ${activeCategory === key ? "active" : ""}`}
                            onClick={() => handleClickLevel1(key)}
                        >
                            {enumList.CategoryLevel1[key].label}
                        </div>

                        {/* Level2: chỉ hiện khi Level1 này đang active */}
                        {activeCategory === key &&
                            subCategories
                                .filter((sub) => sub.parentId === enumList.CategoryLevel1[key].id)
                                .map((sub) => (
                                    <div
                                        key={sub.id}
                                        className={`menu-item ms-4 menu-sub ${activeSubCategory === sub ? "active" : ""}`}
                                        onClick={() => {
                                            setActiveSubCategory(sub);
                                            setShow(false);
                                        }}
                                    >
                                        {sub.label}
                                    </div>
                                ))}
                    </div>
                ))}
            </div>


            {/* Danh sách món ăn */}
            <div className="dish-list flex-grow-1">
                <div className="row g-3 position-relative">
                    {displayList.length > 0 ? (
                        displayList.map((dish) => (
                            <div key={dish.id} className="col-md-4" onClick={() => handleClickShow(dish)}>
                                <div className="card">
                                    <img
                                        src={`http://localhost:8080/images/${dish.anh}`}
                                        className="card-img-top"
                                        alt={dish.ten_mon}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{dish.ten_mon}</h5>
                                        <p className="card-text">{dish.mo_ta}</p>
                                        <p className="text-danger fw-bold">{formatPrice(dish.gia)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Chưa có món nào trong danh mục này.</p>
                    )}
                </div>
            </div>
            {show && (<ShowProduct
                showOpen={show}
                showProduct={selectedDish}
                showClose={() => setShow(false)}

            />)}
        </div>
    );
};

export default ProductsPage;
