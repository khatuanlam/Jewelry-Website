'use client'

import ThemeContext from '@contexts/ThemeContext'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

export default function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [isAgreed, setIsAgreed] = useState(false)
    const { setShowNotification } = useContext(ThemeContext)
    const router = useRouter()

    useEffect(() => {
        // Lấy dữ liệu giỏ hàng từ localStorage
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]")
        setCart(savedCart)
    }, [])

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const updateQuantity = (id, quantity) => {
        // Cập nhật số lượng của sản phẩm trong giỏ hàng
        const updatedCart = cart.map(item =>
            item.id === id
                ? { ...item, quantity: Math.max(1, quantity) } // Đảm bảo số lượng tối thiểu là 1
                : item
        )
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart)) // Lưu lại giỏ hàng vào localStorage
    }

    const removeItem = (id) => {
        // Xóa sản phẩm khỏi giỏ hàng
        const updatedCart = cart.filter(item => item.id !== id)
        setCart(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart))
    }

    const handlePayment = () => {
        if (!isAgreed) {
            // Thông báo người dùng cần đồng ý với điều khoản dịch vụ
            setShowNotification("Vui lòng đồng ý với điều khoản dịch vụ trước khi thanh toán.");
            return;
        }

        if (cart.length === 0) {
            // Thông báo giỏ hàng trống
            setShowNotification("Giỏ hàng của bạn đang trống.");
            return;
        }

        try {
            localStorage.setItem("cart", JSON.stringify(cart));
            router.push("/cart/pay");
        } catch (error) {
            console.error("Không thể lưu giỏ hàng vào localStorage:", error);
            setShowNotification("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <div className="top mb-4">
                        <nav>
                            <h4 className="text-base">
                                <Link href="/" className="text-blue-600 hover:underline">Trang chủ</Link> &gt; Giỏ hàng(<span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>)</h4>
                        </nav>
                    </div>
                    {cart.length == 0 ? (
                        <div className="continue text-center">
                            <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
                            <Link href="" className="text-xl text-blue-600 no-underline">Tiếp tục mua hàng</Link>
                        </div>
                    ) : (
                        <div className="cart-items">
                            {cart.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border-b">
                                    <div className="flex items-center">
                                        <Image
                                            src={item.images ? item.images[0] : item.images[1]}
                                            width={300}
                                            height={300}
                                            className="mr-4"
                                            alt=''
                                        />
                                        <div>
                                            <h4 className="font-bold">{item.name}</h4>
                                            <p className="text-gray-500">Số lượng:</p>
                                            <div className="flex items-center">
                                                <button
                                                    className="text-blue-500"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.quantity}</span>
                                                <button
                                                    className="text-blue-500"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="font-semibold">{`${item.price.toLocaleString()} VNĐ`}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Xóa
                                        </button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>

                <div className="md:w-1/4 mx-6">
                    <div className="bill bg-gray-100 p-6 rounded-lg shadow-md">
                        <div className="order mb-4">
                            <h2 className="text-2xl font-bold">ĐƠN HÀNG</h2>
                        </div>
                        <hr className="my-4" />
                        <div className="text mb-4">
                            <span>Đơn hàng (<span className="order-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>)</span>  </div>
                        <hr className="my-4" />
                        <div className="invoice mb-4">
                            <label htmlFor="issue_invoice" className="flex items-center">
                                <span>Xuất hóa đơn cho đơn hàng</span>
                                <input type="checkbox" id="issue_invoice" />
                            </label>
                        </div>
                        <hr className="my-4" />
                        <div className="notes mb-4">
                            <div className="note mb-2">Ghi chú đơn hàng</div>
                            <div className="write">
                                <textarea className="form_note w-full p-2 border rounded" id="note" name="note" rows={5}></textarea>
                            </div>
                        </div>
                        <hr className="my-4" />
                        <h2 className="text-xl font-bold mb-4">
                            Tạm tính: <span className="tmp">{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} VNĐ</span>
                        </h2>
                        <hr className="my-4" />
                        <div className="pay">
                            <div className="demand mb-4">
                                <label htmlFor="check" className="flex items-start">
                                    <input
                                        type="checkbox"
                                        id="check"
                                        className="mr-2 mt-1"
                                        checked={isAgreed} // Gắn giá trị của isAgreed vào checkbox
                                        onChange={(e) => setIsAgreed(e.target.checked)} // Cập nhật isAgreed khi checkbox thay đổi
                                    />
                                    <span>
                                        Khi bấm nút &quot;Thanh toán&quot; đồng nghĩa khách hàng đã hiểu và đồng ý các
                                        <span onClick={toggleModal} className="text-blue-500 hover:text-blue-600 ml-1 cursor-pointer">
                                            Điều khoản dịch vụ
                                        </span>
                                        của chúng tôi.
                                    </span>
                                </label>
                            </div>
                            <div className="select">
                                <button
                                    id="pay-button"
                                    type="button"
                                    className={`w-full py-2 px-4 rounded transition duration-300 ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                    disabled={cart.length === 0}
                                    onClick={handlePayment} // Gọi hàm handlePayment khi nhấn nút
                                >
                                    THANH TOÁN
                                </button>
                                <p className="text-center my-4">hoặc</p>
                                <div className="continue-buy text-center">
                                    <Link
                                        href="#"
                                        className="text-red-500 no-underline"
                                    >
                                        Tiếp tục mua hàng
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Điều khoản dịch vụ</h2>
                            <button onClick={toggleModal} className="text-2xl">&times;</button>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold mt-4">1. Giới thiệu</h4>
                            <p className="mt-2">
                                Chào mừng quý khách hàng đến với website chúng tôi.<br />
                                Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm hoặc lược bỏ bất kỳ phần nào trong
                                Điều khoản mua bán hàng hóa này, vào bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có nghĩa là quý khách chấp nhận với những thay đổi đó.<br />
                                Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
                            </p>
                            <h4 className="text-xl font-semibold mt-4">2. Hướng dẫn sử dụng website</h4>
                            <p className="mt-2">
                                Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa theo quy định hiện hành của pháp luật Việt Nam.
                            </p>
                            <h4 className="text-xl font-semibold mt-4">3. Thanh toán an toàn và tiện lợi</h4>
                            <p className="mt-2">
                                Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:<br />
                                Cách 1: Thẻ ATM/Visa/Master/JCB/QR Pay qua cổng VNPAY<br />
                                Cách 2: Thanh toán khi giao hàng (COD)<br />
                                Cách 3: Ví MoMo
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
