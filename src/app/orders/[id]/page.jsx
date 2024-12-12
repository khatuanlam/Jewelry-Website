'use client'

import { getOrderById } from '@services/page'
import { formatCurrency } from '@utils/page'
import { ChevronDown, ChevronUp, CreditCard, Package, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function OrderDetailsPage({ params }) {

    const order = getOrderById(params.id)

    const [isProductsExpanded, setIsProductsExpanded] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8">
            <div
                className={`max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                    }`}
            >
                <div className="px-6 py-8">
                    <h1
                        className={`text-4xl font-bold text-center text-black mb-8 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        Chi tiết đơn hàng #{order.id}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`space-y-6 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="bg-indigo-50 p-6 rounded-lg">
                                <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
                                    <User className="mr-2" /> Thông tin khách hàng
                                </h2>
                                <p><strong>Tên:</strong> {order.name || 'Chưa có thông tin'}</p>
                                <p><strong>Email:</strong> {order.email || 'Chưa có thông tin'}</p>
                                <p><strong>Số điện thoại:</strong> {order.phone || 'Chưa có thông tin'}</p>
                                <p><strong>Địa chỉ:</strong> {order.address || 'Chưa có thông tin'}</p>
                                <p><strong>Tỉnh/Thành phố:</strong> {order.province || 'Chưa có thông tin'}</p>
                                <p><strong>Quận/Huyện:</strong> {order.district || 'Chưa có thông tin'}</p>
                                <p><strong>Phường/Xã:</strong> {order.ward || 'Chưa có thông tin'}</p>
                            </div>
                        </div>

                        <div className={`space-y-6 transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}>
                            <div className="bg-purple-50 p-6 rounded-lg">
                                <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
                                    <Package className="mr-2" /> Thông tin đơn hàng
                                </h2>
                                <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                                <p><strong>Tổng giá trị:</strong> {formatCurrency(order.price)}</p>
                                <p><strong>Trạng thái:</strong>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-sm ${order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'
                                        }`}>
                                        {order.status === 'pending' ? 'Đang xử lý' : order.status}
                                    </span>
                                </p>
                                <p><strong>Ngày tạo:</strong> {order.createAt}</p>
                                <p><strong>Phương thức thanh toán:</strong>
                                    <span className="ml-2 flex items-center">
                                        <CreditCard className="mr-1" />
                                        {order.payment === 'cash' ? 'Tiền mặt' : order.payment}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`mt-12 bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <h2
                            className="text-2xl font-semibold text-black mb-4 cursor-pointer flex items-center justify-between"
                            onClick={() => setIsProductsExpanded(!isProductsExpanded)}
                        >
                            Sản phẩm
                            {isProductsExpanded ? <ChevronUp /> : <ChevronDown />}
                        </h2>
                        <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${isProductsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                }`}
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-indigo-200 text-black">
                                            <th className="p-2 text-left">Tên sản phẩm</th>
                                            <th className="p-2 text-left">Giá</th>
                                            <th className="p-2 text-left">Số lượng</th>
                                            <th className="p-2 text-left">Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.map((product) => (
                                            <tr key={product.id} className="border-b border-indigo-100">
                                                <td className="p-2">{product.name}</td>
                                                <td className="p-2">{formatCurrency(product.price)} đ</td>
                                                <td className="p-2">{product.quantity}</td>
                                                <td className="p-2">{formatCurrency(product.price * product.quantity)} đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`mt-12 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg transition-all duration-500 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        <h2 className="text-2xl font-semibold text-black mb-4 flex items-center">
                            <User className="mr-2" /> Thông tin chủ đơn hàng
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Tên:</strong> {order.owner.name}</p>
                            <p><strong>Email:</strong> {order.owner.email}</p>
                            <p><strong>Giới tính:</strong> {order.owner.gender === 'female' ? 'Nữ' : 'Nam'}</p>
                            <p><strong>Ngày sinh:</strong> {order.owner.dob}</p>
                            <p><strong>Sở thích:</strong> {order.owner.interest}</p>
                            <p><strong>Địa chỉ:</strong> {order.owner.address}</p>
                            <p><strong>Trạng thái tài khoản:</strong>
                                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${order.owner.active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                                    }`}>
                                    {order.owner.active ? 'Đang hoạt động' : 'Không hoạt động'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


