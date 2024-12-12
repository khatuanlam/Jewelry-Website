'use client'

import { Label } from '@components/ui/label'
import AuthContext from '@contexts/auth/AuthContext'
import ThemeContext from '@contexts/ThemeContext'

import { provincesData } from '@data/page'
import { Box, CreditCard, Wallet } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'
export default function CheckoutPage() {
    const [state, setState] = useState({
        paymentMethod: '',
        orderCompleted: false,
        provinces: [],
        districts: [],
        wards: [],
        selectedProvince: '',
        selectedDistrict: '',
        cart: [],
        email: '',
        phone: '',
        address: '',
        useCurrentAddress: false
    });

    const { userLogin } = useContext(AuthContext)
    const { router, setShowNotification } = useContext(ThemeContext)


    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setState(prev => ({
            ...prev,
            cart: savedCart,
            provinces: JSON.parse(provincesData).map(item => ({
                code: item.Code,
                name: item.FullName
            }))
        }))
    }, [])



    const handleAddressChange = (e) => {
        setState(prev => ({ ...prev, address: e.target.value }))
        setState(prev => ({ ...prev, useCurrentAddress: false }))
    }

    const handleRadioChange = () => {
        setState(prev => ({ ...prev, useCurrentAddress: !state.useCurrentAddress }))
        if (!state.useCurrentAddress) {
            setState(prev => ({ ...prev, address: userLogin.address }))
        }
    }

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value
        const province = JSON.parse(provincesData).find(p => p.Code === provinceCode)
        setState(prev => ({
            ...prev,
            selectedProvince: provinceCode,
            selectedDistrict: '',
            districts: province ? province.District : [],
            wards: []
        }))
    }

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value
        const province = JSON.parse(provincesData).find(p => p.Code === state.selectedProvince)
        const district = province?.District.find(d => d.Code === districtCode)
        setState(prev => ({
            ...prev,
            selectedDistrict: districtCode,
            wards: district ? district.Ward : []
        }))
    }

    const totalAmount = state.cart.reduce((total, item) => total + item.price * item.quantity + 19000, 0)


    const handleOrderCompletion = async (e) => {
        e.preventDefault()
        const { email, phone, paymentMethod } = state

        if (!email.includes('@gmail.com')) {
            setShowNotification('Email phải có định dạng @gmail.com')
            return
        }

        if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
            setShowNotification('Số điện thoại phải có 10 chữ số!')
            return
        }

        if (!paymentMethod) {
            setShowNotification('Vui lòng chọn phương thức thanh toán!')
            return
        }

        const formData = new FormData(e.target)
        const orderDetail = {
            ...Object.fromEntries(formData.entries()),
            user_id: userLogin.id,
            products: state.cart,
            owner: userLogin,
            price: totalAmount,
            status: 'pending',
            createAt: new Date(Date.now()).toLocaleString('vi-VN')
        }

        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetail)
        })

        if (response.ok) {
            localStorage.clear()
            setState(prev => ({ ...prev, orderCompleted: true }))
            router.refresh()
        }

    }


    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-16 gap-y-8">
                    {/* Left Column */}
                    <div className="lg:col-span-3 flex flex-col order-last lg:order-first">
                        <nav className="mb-8">
                            <div className="fflex items-center text-sm hidden lg:flex">
                                <Link href="/cart" className="text-gray-600 hover:text-gray-800">
                                    Giỏ hàng
                                </Link>
                                <span className="mx-2 text-gray-400">&gt;</span>
                                <span className="text-gray-800">Thông tin giao hàng</span>
                            </div>
                        </nav>
                        <div className="mb-6">
                            <p className="text-sm text-gray-600">
                                <Link href="/login" className="text-red-500 hover:text-red-600">
                                    Nhập thông tin giao hàng
                                </Link>
                            </p>

                        </div>

                        <form className="space-y-6" onSubmit={handleOrderCompletion}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Họ và tên"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                    name='name'
                                    required
                                />
                                <div className="grid gap-4 md:grid-cols-2">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                        required
                                        value={state.email}
                                        name='email'
                                        onChange={(e) => setState(prev => ({ ...prev, email: e.target.value }))}
                                    />
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                        required
                                        name='phone'
                                        value={state.phone}
                                        onChange={(e) => setState(prev => ({ ...prev, phone: e.target.value }))} // Cập nhật giá trị phone
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Địa chỉ nhận hàng"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                    name='address'
                                    value={state.address}
                                    onChange={handleAddressChange}
                                    required
                                />
                                <label className="flex cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        checked={state.useCurrentAddress}
                                        onChange={handleRadioChange}
                                        className="h-4 w-4 text-blue-600"
                                    />
                                    <Box className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm">
                                        Dùng địa chỉ hiện tại
                                    </span>
                                </label>
                                <div className="grid gap-4 md:grid-cols-3">
                                    <select
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                        value={state.selectedProvince}
                                        onChange={handleProvinceChange}
                                        name='province'
                                    >
                                        <option value="">Chọn tỉnh / thành</option>
                                        {state.provinces.map(province => (
                                            <option key={province.code} value={province.code}>{province.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                        value={state.selectedDistrict}
                                        onChange={handleDistrictChange}
                                        disabled={!state.selectedProvince}
                                        name='district'
                                    >
                                        <option value="">Chọn quận / huyện</option>
                                        {state.districts.map(district => (
                                            <option key={district.Code} value={district.Code}>{district.FullName}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                        disabled={!state.selectedDistrict}
                                        name='ward'
                                    >
                                        <option value="">Chọn phường / xã</option>
                                        {state.wards.map(ward => (
                                            <option key={ward.Code} value={ward.Code}>{ward.FullName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-medium">Phương thức thanh toán</h4>
                                <div className="space-y-2 rounded-md border border-gray-200 p-4">
                                    <label className="flex cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="atm"
                                            checked={state.paymentMethod === 'atm'}
                                            onChange={(e) => setState(prev => ({ ...prev, paymentMethod: e.target.value }))}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <CreditCard className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm">
                                            Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY
                                        </span>
                                    </label>

                                    <label className="flex cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={state.paymentMethod === 'cash'}
                                            onChange={(e) => setState(prev => ({ ...prev, paymentMethod: e.target.value }))}
                                            className="h-4 w-4 text-blue-600"
                                        />
                                        <Wallet className="h-5 w-5 text-gray-400" />
                                        <span className="text-sm">Tiền mặt (Thanh toán khi giao hàng)</span>
                                    </label>
                                    {state.paymentMethod === 'atm' && (
                                        <>
                                            <Label className="flex items-center space-x-3 rounded-md py-3 px-1 hover:bg-gray-50">
                                                Thông tin thẻ</Label>
                                            <input
                                                type="text"
                                                placeholder="Mã số thẻ"
                                                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                                name='card_number'
                                                required
                                            />

                                            <div className="grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <Label className="flex items-center space-x-3 rounded-md py-3 px-1 hover:bg-gray-50">
                                                        CVV</Label>
                                                    <input
                                                        type="text"
                                                        placeholder="CVV"
                                                        className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                                        name='card_number'
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="flex items-center space-x-3 rounded-md py-3 px-1 hover:bg-gray-50">
                                                        Ngày hết hạn</Label>
                                                    <input
                                                        type="date"
                                                        id="birthdate"
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <Label className="flex items-center space-x-3 rounded-md py-3 px-1 hover:bg-gray-50">
                                                Tên chủ thẻ</Label>
                                            <input
                                                type="text"
                                                placeholder="Tên chủ thẻ"
                                                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                                                name='name'
                                                required
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Link
                                    href="/cart"
                                    className="text-sm text-red-500 hover:text-red-600"
                                >
                                    Giỏ hàng
                                </Link>
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-500 px-6 py-3 text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </form>
                        {/* Show confirmation message when order is completed */}
                        {state.orderCompleted && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                                <div className="bg-white p-8 rounded-md text-center max-w-lg w-full">
                                    <Image src="/assets/images/tick.png" alt="" className="mx-auto mb-5 w-[140px] h-[120px]" height={300} width={300} />
                                    <h2 className="text-2xl font-semibold mb-4">Đơn hàng đã hoàn tất</h2>
                                    <div className="flex space-x-4 justify-center">
                                        <button className="flex items-center justify-center space-x-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
                                            <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
                                                Quay về trang chủ
                                            </Link>
                                        </button>
                                        <button className="flex items-center justify-center space-x-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
                                            <Link href="/cart" className="text-sm text-blue-600 hover:text-blue-700">
                                                Tiếp tục mua hàng
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 lg:col-start-4 order-first lg:order-last">
                        <div className="rounded-lg bg-gray-50 p-6 h-full">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {/* Hiển thị giỏ hàng */}
                                    {
                                        state.cart.length > 0 && state.cart.map(item => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <div className="flex items-center space-x-4">
                                                    {/* Hiển thị hình ảnh */}
                                                    <Image src={item.images ? item.images[0] : item.images[1]} className="h-12 w-12 object-cover rounded" alt='' width={300} height={300} />
                                                    <span className="text-gray-600 break-words max-w-md">{item.name}</span>
                                                </div>
                                                <span className="ml-4">{(item.quantity * item.price).toLocaleString()} VND</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <hr className="border-gray-200" />
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tạm tính:</span>
                                        <span>{totalAmount.toLocaleString()} VND</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Phí vận chuyển:</span>
                                        <span>19.000 VND</span>
                                    </div>
                                    <div className="flex justify-between font-medium">
                                        <span className="text-gray-900">Tổng cộng:</span>
                                        <span>{totalAmount.toLocaleString()} VND</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}