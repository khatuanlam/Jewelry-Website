'use client'
import { useState } from "react";
import { getHistoryOrder } from "@services/page";
import { Edit, ShoppingBag, User } from 'lucide-react';
import { useEffect } from "react";

export default function AccountPage({ info }) {
    const [userInfo, setUserInfo] = useState(info);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const updateUserInfo = (e) => {
        e.preventDefault();
        Object.entries(userInfo).forEach(([key, value]) => {
            sessionStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
        });
        setIsEditModalOpen(false);
        alert('Thông tin tài khoản đã được cập nhật!');
    };

    useEffect(() => {
        const historyOrder = getHistoryOrder(userInfo.id);
        if (historyOrder) {
            setHistory(historyOrder);
        } else {
            console.log('Chưa có lịch sử thanh toán');
        }
    }, []);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const closeOrderDetail = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="bg-white min-h-screen">
            <header className="bg-gradient-to-r from-gray-400 to-gray-100 h-64 flex flex-col justify-center shadow-lg" style={{ height: '300px' }}>
                <h1 className="text-4xl font-semibold text-white ml-4 flex items-center">
                    XIN CHÀO, {userInfo.name || 'KHÁCH'}
                </h1>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 shadow border border-gray-500">
                        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
                            <User className="mr-2" /> Thông Tin Tài Khoản
                        </h2>
                        <div className="space-y-4">
                            <p className="flex items-center text-black"><strong className="w-32">Tên:</strong> {userInfo.name || 'Not set'}</p>
                            <p className="flex items-center text-black"><strong className="w-32">Email:</strong> {userInfo.email || 'Not set'}</p>
                            <p className="flex items-center text-black"><strong className="w-32">Giới tính:</strong> {userInfo.gender || 'Not set'}</p>
                            <p className="flex items-center text-black"><strong className="w-32">Ngày sinh:</strong> {userInfo.dob || 'Not set'}</p>
                            <p className="flex items-center text-black"><strong className="w-32">Địa chỉ:</strong> {userInfo.address || 'Not set'}</p>
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="text-blue-600 underline cursor-pointer mt-6 flex items-center"
                        >
                            <Edit className="mr-2" /> Sửa Thông Tin
                        </button>
                    </div>

                    <div className="bg-white p-6 shadow border border-gray-500">
                        <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
                            <ShoppingBag className="mr-2" /> Lịch Sử Mua Hàng
                        </h2>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border p-2 bg-gray-100 text-black">Ngày</th>
                                    <th className="border p-2 bg-gray-100 text-black">Sản phẩm</th>
                                    <th className="border p-2 bg-gray-100 text-black">Giá</th>
                                    <th className="border p-2 bg-gray-100 text-black">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((order, index) => (
                                    <tr className="hover:bg-gray-50" key={index}>
                                        <td className="border p-2 text-center">{order.createAt}</td>
                                        <td className="border p-2">{order.products[0].name}</td>
                                        <td className="border p-2 text-right">
                                            {order.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </td>
                                        <td className="border p-2 text-center">
                                            <button
                                                onClick={() => handleViewOrder(order)}
                                                className="text-blue-600 underline"
                                            >
                                                Xem Chi Tiết
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg">
                        <h3 className="text-xl font-semibold text-black mb-4">Chi Tiết Đơn Hàng</h3>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border p-2 bg-gray-100 text-black">Sản phẩm</th>
                                    <th className="border p-2 bg-gray-100 text-black">Số lượng</th>
                                    <th className="border p-2 bg-gray-100 text-black">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.products.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="border p-2">{product.name}</td>
                                        <td className="border p-2 text-center">{product.quantity}</td>
                                        <td className="border p-2 text-right">
                                            {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p className="mt-4 text-right font-semibold text-black">
                            Tổng Giá: {selectedOrder.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </p>
                        <div className="mt-6 text-center">
                            <button
                                onClick={closeOrderDetail}
                                className="px-6 py-2 bg-blue-600 text-white rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
                            <Edit className="mr-2" /> Sửa Thông Tin Tài Khoản
                        </h2>
                        <form onSubmit={updateUserInfo}>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className=" mb-2 flex items-center text-black">
                                        Tên:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={userInfo.name}
                                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 flex items-center text-black">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender" className="mb-2 flex items-center text-black">
                                        Giới tính:
                                    </label>
                                    <select
                                        id="gender"
                                        value={userInfo.gender}
                                        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="birthdate" className=" mb-2 flex items-center text-black">
                                        Ngày sinh:
                                    </label>
                                    <input
                                        type="date"
                                        id="birthdate"
                                        value={userInfo.birthdate}
                                        onChange={(e) => setUserInfo({ ...userInfo, birthdate: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end text-black mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-200 rounded"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
                                >
                                    Lưu Thay Đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
