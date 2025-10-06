import React from 'react';

const AddUserPage = () => {
    return (
        <div>
            <h4 className="mb-3">Form Thêm Người Dùng</h4>
            <form>
                <div className="mb-3">
                    <label className="form-label">Tên người dùng</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nhập tên người dùng"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Nhập email"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Lưu người dùng
                </button>
            </form>
        </div>
    );
};

export default AddUserPage;