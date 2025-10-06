import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from "react-router-dom";

import * as productSlice from "../../../redux/Slice/productSlice";
import "./HomePage.css"

const HomePage = () => {

    const {topList, loading, error} = useSelector((state) => state.products);
    const dispatch = useDispatch();

    // hàm get
    useEffect(() => {
        dispatch(productSlice.fetchProduct());
    }, [dispatch]);

    // console.log(listProduct);
    return (
        <div>
            <div className="container mt-5">
                <div className="card mb-3 card-intro">
                    <div className="row g-0 h-100">
                        <div className="col-md-4 h-100">
                            <img
                                src="/images/images.jpg"
                                className="img-fluid card-intro-img"
                                alt="..."
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-intro-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to additional
                                    content.
                                    This content is a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-body-secondary">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="monnoibat" className="container mt-5">
                <h3 className="text-center mb-5">CÁC MÓN ĂN NỔI BẬT</h3>

                {/* Hàng 1 */}
                <div className="row g-4">
                    {topList.slice(0, 3).map((item, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 card-feature">
                                <img src={`http://localhost:8080/images/${item.anh}`} className="card-feature-img"
                                     alt={`Card ${item.ten_mon}`}/>
                                <div className="card-feature-body">
                                    <h5 className="card-title">{`${item.ten_mon}`}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hàng 2 */}
                <div className="row g-4 mt-3">
                    {topList.slice(3, 6).map((item, index) => (
                        <div className="col" key={index}>
                            <div className="card h-100 card-feature">
                                <img src={`http://localhost:8080/images/${item.anh}`}  className="card-feature-img"
                                     alt={`Card ${item.ten_mon}`}/>
                                <div className="card-feature-body">
                                    <h5 className="card-title">{`${item.ten_mon}`}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container mt-5">
                <div className="menu-card text-center p-4">
                    <Link to="/products" className="btn btn-menu">
                        🍽 XEM TOÀN BỘ THỰC ĐƠN
                        <span className="ml-2.5 green transform scale-[0.8] sm:transform-none">
								<svg width="24" height="25" viewBox="0 0 24 25" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.34766 17.2886L14.3477 12.2886L9.34766 7.28857" stroke="#1A1A1A"
                                      stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;