// utils/format.js
export const formatPrice = (price) => {
    return Number(price).toLocaleString('vi-VN', { maximumFractionDigits: 0 }) + ' đ';
};
