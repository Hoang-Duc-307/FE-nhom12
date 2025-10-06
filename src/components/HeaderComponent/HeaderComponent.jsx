import React from 'react';
import { NavLink } from "react-router-dom";
import "./HeaderComponent.css"
const HeaderComponent = () => {
    return (
        <div className="">
            <div id="nav-container" className="">
                <div className="nav-inner">
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container">
                            <NavLink className="navbar-brand" to="/"><img src="/images/pngtree-cooking-logo-vector-png-image_6625812.png" className="img-logo" alt="..."/></NavLink>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) =>
                                                isActive ? "nav-link active" : "nav-link"
                                            }
                                        >
                                            Trang Chủ
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/products"
                                            className={({ isActive }) =>
                                                isActive ? "nav-link active" : "nav-link"
                                            }
                                        >
                                            Xem thực đơn
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/order"
                                            className={({ isActive }) =>
                                                isActive ? "nav-link active" : "nav-link"
                                            }
                                        >
                                            Đặt món
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            to="/about"
                                            className={({ isActive }) =>
                                                isActive ? "nav-link active " : "nav-link "
                                            }
                                        >
                                            Giới Thiệu
                                        </NavLink>
                                    </li>
                                </ul>

                                {/* Search form */}
                                <form className="d-flex">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <button className="btn btn-outline-success" type="submit">
                                        Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

            <div id="carouselExampleControls" className="carousel slide mt-5 " data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active"><img
                        src="/images/banh-cuon-hinh-anh-mon-an-dac-san-viet-nam.jpg" className="d-block w-100"
                        alt="..."/></div>
                    <div className="carousel-item"><img src="/images/Saodieu - 10 mon an 3.jpg" className="d-block w-100"
                                                        alt="..."/></div>
                    <div className="carousel-item"><img src="/images/images.jpg" className="d-block w-100" alt="..."/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span></button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span></button>
            </div>
        </div>
    );
};

export default HeaderComponent;