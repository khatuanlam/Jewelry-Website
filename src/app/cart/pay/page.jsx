'use client'

import { Box, CreditCard, Wallet } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('')
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load cart data from sessionStorage
    const savedCart = JSON.parse(sessionStorage.getItem('cart') || '[]')
    setCart(savedCart)

    fetch('/data/vn_only_simplified_json_generated_data_vn_units.json')
      .then((response) => response.json())
      .then((data) => {
        const provinceData = data.map((item) => ({
          code: item.Code,
          name: item.FullName,
        }))
        setProvinces(provinceData)
      })
      .catch((error) => console.error('Error loading provinces:', error))
  }, [])

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value
    setSelectedProvince(provinceCode)
    setSelectedDistrict('')
    setWards([])

    if (provinceCode) {
      fetch('/data/vn_only_simplified_json_generated_data_vn_units.json')
        .then((response) => response.json())
        .then((data) => {
          const province = data.find((p) => p.Code === provinceCode)
          if (province) {
            setDistricts(province.District)
          }
        })
        .catch((error) => console.error('Error loading districts:', error))
    } else {
      setDistricts([])
    }
  }

  const handleDistrictChange = (e) => {
    const districtCode = e.target.value
    setSelectedDistrict(districtCode)

    if (districtCode) {
      fetch('/data/vn_only_simplified_json_generated_data_vn_units.json')
        .then((response) => response.json())
        .then((data) => {
          const province = data.find((p) => p.Code === selectedProvince)
          if (province) {
            const district = province.District.find((d) => d.Code === districtCode)
            if (district) {
              setWards(district.Ward)
            }
          }
        })
        .catch((error) => console.error('Error loading wards:', error))
    } else {
      setWards([])
    }
  }

  const handleOrderCompletion = (e) => {
    e.preventDefault()
    const emailIsValid = email.includes('@gmail.com')
    const phoneIsValid = phone.length === 10 && /^[0-9]+$/.test(phone)
    const paymentMethodIsSelected = paymentMethod !== ''

    if (!emailIsValid) {
      alert('Email phải có định dạng @gmail.com')
      return
    }

    if (!phoneIsValid) {
      alert('Số điện thoại phải có 10 chữ số!')
      return
    }

    if (!paymentMethodIsSelected) {
      alert('Vui lòng chọn phương thức thanh toán!')
      return
    }

    setOrderCompleted(true)
    setPaymentMethod('processing')
    // Lưu giỏ hàng vào sessionStorage và chuyển đến trang thanh toán
    sessionStorage.setItem('cart', JSON.stringify(cart))
    router.push('/cart/pay')
  }

  // Calculate totalAmount
  const totalAmount = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)


  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4 w-full justify-center lg:justify-start mt-5">
            <img src="/logo.png" alt="Logo" className="h-13 w-auto" />
          </div>
        </div>
      </header>

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
                Bạn đã có tài khoản?{' '}
                <Link href="/login" className="text-red-500 hover:text-red-600">
                  Đăng nhập
                </Link>
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleOrderCompletion}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                  required
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // Cập nhật giá trị phone
                  />

                </div>
                <input
                  type="text"
                  placeholder="Địa chỉ nhận hàng"
                  className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                  required
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <select
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Chọn tỉnh / thành</option>
                    {provinces.map(province => (
                      <option key={province.code} value={province.code}>{province.name}</option>
                    ))}
                  </select>
                  <select
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    disabled={!selectedProvince}
                  >
                    <option value="">Chọn quận / huyện</option>
                    {districts.map(district => (
                      <option key={district.Code} value={district.Code}>{district.FullName}</option>
                    ))}
                  </select>
                  <select
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-gray-400 focus:outline-none"
                    disabled={!selectedDistrict}
                  >
                    <option value="">Chọn phường / xã</option>
                    {wards.map(ward => (
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
                      value="vnpay"
                      checked={paymentMethod === 'vnpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
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
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Box className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">Thanh toán khi giao hàng (COD)</span>
                  </label>
                  <label className="flex cursor-pointer items-center space-x-3 rounded-md p-3 hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <Wallet className="h-5 w-5 text-gray-400" />
                    <span className="text-sm">Ví MoMo</span>
                  </label>
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
                  Hoàn tất đơn hàng
                </button>
              </div>
            </form>
            {/* Show confirmation message when order is completed */}
            {orderCompleted && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-md text-center max-w-lg w-full">
                  <img src="/assets/images/tick.png" alt="" className="mx-auto mb-5 w-[140px] h-[120px]" />
                  <h2 className="text-2xl font-semibold mb-4">Đơn hàng đã hoàn tất</h2>
                  <div className="flex space-x-4 justify-center">
                    <button className="flex items-center justify-center space-x-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
                      <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
                        Quay về trang chủ
                      </Link>
                    </button>
                    <button className="flex items-center justify-center space-x-2 text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50">
                      <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
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
                    cart.length > 0 && cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          {/* Hiển thị hình ảnh */}
                          <img src={item.images} className="h-12 w-12 object-cover rounded" />
                          <span className="text-gray-600 break-words max-w-md">{item.name}</span>
                        </div>
                        <span className="ml-4">{(item.quantity * item.price).toLocaleString()} VND</span>                      </div>
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
                    <span>0 VND</span>
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