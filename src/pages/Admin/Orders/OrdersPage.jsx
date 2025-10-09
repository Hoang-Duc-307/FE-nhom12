import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders, deleteOrder, getOrderById, updateOrder} from '../../../redux/Slice/orderSlice';
import './OrdersPage.css'
import { formatPrice } from '../../../utils/format'

const OrdersPage = () => {
    const dispatch = useDispatch();
    const {list, loading, error, current} = useSelector(s => s.orders);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc muốn xóa order này?')) {
            dispatch(deleteOrder(id));
        }
    };

    const handleView = (id) => {
        setSelectedId(id);
        dispatch(getOrderById(id));
    };

    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({name: '', phoneNumber: '', email: '', address: '', notes: ''});

    const handleStartEdit = (order) => {
        setIsEditing(true);
        setEditValues({
            name: order.name || '',
            phoneNumber: order.phoneNumber || '',
            email: order.email || '',
            address: order.address || '',
            notes: order.notes || '',
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveEdit = async (id) => {
        // Only send fields that backend handles (name, phoneNumber, email, notes)
        const payload = {
            name: editValues.name,
            phoneNumber: editValues.phoneNumber,
            email: editValues.email,
            address: editValues.address,
            notes: editValues.notes,
        };
    await dispatch(updateOrder({id, payload}));
        // refresh list and details
        await dispatch(fetchOrders());
        await dispatch(getOrderById(id));
        setIsEditing(false);
    };

    if (loading) return <p>Đang tải đơn hàng...</p>;
    if (error) return <p>Lỗi: {error}</p>;

    return (
        <div className="orders-page">
            <h2 className="mb-4">Quản lý Orders</h2>

            <div className="card p-3">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Phone</th>
                        <th>Địa chỉ</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list && list.length ? list.map(o => (
                        <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.name}</td>
                            <td>{o.phoneNumber}</td>
                            <td>{o.address || '—'}</td>
                            <td>{formatPrice(o.gia)}</td>
                            <td>
                                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleView(o.id)}>Chi tiết</button>
                                <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleStartEdit(o)}>Sửa</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(o.id)}>Xóa</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6">Không có order</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {selectedId && current && current.id === selectedId && (
                <div className="card mt-3 p-3">
                    <h5>Chi tiết Order #{current.id}</h5>

                    {!isEditing ? (
                        <>
                            <p><strong>Tên:</strong> {current.name}</p>
                            <p><strong>SĐT:</strong> {current.phoneNumber}</p>
                            <p><strong>Địa chỉ:</strong> {current.address}</p>
                            <p><strong>Email:</strong> {current.email}</p>
                            <p><strong>Ghi chú:</strong> {current.notes}</p>
                            <p><strong>Tổng:</strong> {current.gia}</p>
                            <div className="mt-2">
                                <button className="btn btn-sm btn-primary me-2" onClick={() => handleStartEdit(current)}>Sửa</button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => { setSelectedId(null); }} >Đóng</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-2">
                                <label className="form-label">Tên</label>
                                <input className="form-control" value={editValues.name} onChange={(e) => setEditValues({...editValues, name: e.target.value})} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">SĐT</label>
                                <input className="form-control" value={editValues.phoneNumber} onChange={(e) => setEditValues({...editValues, phoneNumber: e.target.value})} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Email</label>
                                <input className="form-control" value={editValues.email} onChange={(e) => setEditValues({...editValues, email: e.target.value})} />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">Ghi chú</label>
                                <textarea className="form-control" value={editValues.notes} onChange={(e) => setEditValues({...editValues, notes: e.target.value})} />
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-sm btn-success me-2" onClick={() => handleSaveEdit(current.id)}>Lưu</button>
                                <button className="btn btn-sm btn-outline-secondary" onClick={handleCancelEdit}>Hủy</button>
                            </div>
                        </>
                    )}

                    <h6 className="mt-3">Details:</h6>
                    <ul>
                        {current.details && current.details.length ? current.details.map(d => (
                            <li key={d.id}>
                                {d.sanPham ? `${d.sanPham.ten_mon}` : `Sản phẩm id:${d.sanPhamId}`} — số lượng: {d.quantity} — giá: {formatPrice(d.price)}
                            </li>
                        )) : (<li>Không có chi tiết</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
