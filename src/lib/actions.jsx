// Lấy danh sách orders
export const getOrders = async () => {
    const res = await fetch('/api/orders');
    return res.json();
};

// Thêm đơn hàng mới
export const addOrder = async (order) => {
    const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    return res.json();
};
