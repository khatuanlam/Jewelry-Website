export default function Cart() {
    return (
        <>
            <header>
                <h2>Giỏ hàng của bạn</h2>
            </header>
            <div className="cart">
                <div className="cart-left">
                    <div className="top">
                        <nav>
                            <h4><a href="#">Trang chủ</a> Giỏ hàng (<span className="cart-count">0</span>)</h4>
                        </nav>
                    </div>
                    <div className="continue">
                        <p>Giỏ hàng của bạn đang trống</p>
                        <a href="sanpham.html">Tiếp tục mua hàng</a>
                    </div>
                    <div className="cart-items"></div>
                </div>
                <div className="cart-right">
                    <div className="bill">
                        <div className="order">
                            <h2>ĐƠN HÀNG</h2>
                        </div>
                        <hr />
                        <div className="text">
                            <span>Đơn hàng (<span className="order-count">0</span>)</span>
                            <hr />
                        </div>
                        <div className="invoice">
                            <label htmlFor="issue_invoice">Xuất hóa đơn cho đơn hàng</label>
                            <input type="checkbox" id="issue_invoice" />
                            <hr />
                        </div>
                        <div className="notes">
                            <div className="note">Ghi chú đơn hàng</div>
                            <div className="write">
                                <textarea className="form_note" id="note" name="note" rows="5"></textarea>
                                <hr />
                            </div>
                        </div>
                        <h2>Tạm tính: <span className="tmp">0</span></h2>
                        <hr />
                        <div className="pay">
                            <div className="demand">
                                <input type="checkbox" id="check" />
                                <label htmlFor="text">
                                    Khi bấm nút Thanh toán đồng nghĩa khách hàng đã hiểu và đồng ý các
                                    <span className="clause"><a href="#" id="showterms">Điều khoản dịch vụ</a></span> của chúng tôi.
                                </label>
                                <br />
                            </div>
                            <div id="mymodal" className="modal">
                                <div className="modal_content">
                                    <span className="close">&times;</span>
                                    <h2>Điều khoản dịch vụ</h2><br />
                                    <h4>1. Giới thiệu</h4>
                                    <p>
                                        Chào mừng quý khách hàng đến với website chúng tôi.<br />
                                        Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý với các điều khoản này.
                                    </p>
                                    <h4>2. Hướng dẫn sử dụng website</h4>
                                    <p>
                                        Khách hàng đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng hóa.
                                    </p>
                                    <h4>3. Thanh toán an toàn và tiện lợi</h4>
                                    <p>
                                        Người mua có thể tham khảo các phương thức thanh toán: Thẻ ATM/Visa/Master/JCB, COD, Ví MoMo.
                                    </p>
                                </div>
                            </div>
                            <div className="select">
                                <button id="pay-button" type="button">THANH TOÁN</button>
                                <p>hoặc</p>
                                <div className="continue-buy">
                                    <a href="sanpham.html">Tiếp tục mua hàng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
