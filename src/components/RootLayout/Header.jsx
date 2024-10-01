
const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className='container'>
                xin chào
            </div>
            <nav className="flex justify-around py-3">
                <a href="#" className="text-gray-600 hover:text-black">ĐỘC QUYỀN ONLINE</a>
                <a href="#" className="text-gray-600 hover:text-black">KHUYẾN MÁI</a>
                <a href="#" className="text-gray-600 hover:text-black">VÒNG TAY</a>
                <a href="#" className="text-gray-600 hover:text-black">CHARMS</a>
                <a href="#" className="text-gray-600 hover:text-black">TRANG SỨC</a>
                <a href="#" className="text-gray-600 hover:text-black">BỘ SƯU TẬP MỚI</a>
                <a href="#" className="text-gray-600 hover:text-black">COLLECTIONS</a>
            </nav>
        </header>
    );
};

export default Header;
