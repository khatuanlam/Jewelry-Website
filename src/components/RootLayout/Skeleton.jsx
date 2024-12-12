
const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-white-200 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="text-black-500 text-xl font-semibold">Đang tải...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;