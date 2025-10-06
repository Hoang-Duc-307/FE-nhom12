import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

const AboutPage = () => {
    const {thongtinList} = useSelector((state) => state.enums);
    // console.log(thongtinList);
    return (
        <div>
            <h3 className="text-center my-5">Giới Thiệu Các Thành Viên Trong Nhóm</h3>
            <div>
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {Object.values(thongtinList?.thongTin || {}).map((person, index) => (
                        <div key={index} className="col">
                            <div className="card h-100">
                                <img
                                    src={`http://localhost:8080/images/${person.hinhAnh}`}
                                    className="card-img-top"
                                    alt={person.hoTen}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">Tên: {person.hoTen}</h5>
                                    <h6 className="card-text">Ngày Sinh: {person.ngaySinh}</h6>
                                    <h6 className="card-text">Mã Sinh Viên: {person.maSinhVien}</h6>
                                    <h6 className="card-text">Tên Lớp: {person.tenLop}</h6>
                                    <h6 className="card-text">Số Điện Thoại: {person.soDienThoai}</h6>
                                    <h6 className="card-text">Email: {person.email}</h6>
                                    <h6 className="card-text">
                                        Đơn Vị Công Tác:{" "}
                                        <a href={person.websiteDonVi} target="_blank" rel="noopener noreferrer">
                                            {person.donViCongTac}
                                        </a>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default AboutPage;