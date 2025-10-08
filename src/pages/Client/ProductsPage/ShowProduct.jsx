import React from 'react';

import "./ShowProduct.css"
import {formatPrice} from "../../../utils/format";

const ShowProduct = ({showOpen,showProduct,showClose}) => {
    console.log(showProduct)
    return (
        <div>
            <div className="card text-white showproduct">
                <button className="close-btn" onClick={showClose}>×</button>
                <img src={`http://localhost:8080/images/${showProduct.anh}`} className="card-img" alt="..."/>
                <div className="card-img-overlay cart-show">
                    <h5 className="card-title">{showProduct.ten_mon}</h5>
                    <p className="card-text">{showProduct.mo_ta}</p>
                    <p className="text-danger fw-bold">{formatPrice(showProduct.gia)}</p>
                </div>
            </div>
        </div>
    );
};

export default ShowProduct;