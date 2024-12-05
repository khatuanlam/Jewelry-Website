// Chỉnh sửa lại giá hiển thị
export function formatCurrency(value) {
    // Đảm bảo giá trị đầu vào là chuỗi
    const numberString = value.toString();

    // Sử dụng Regular Expression để thêm dấu chấm sau mỗi 3 số từ phải sang trái
    const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formatted;
}

// Kiểm tra định dạng email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export function extractDate(datetime) {
    // Tách chuỗi thành phần thời gian và ngày
    const [time, date] = datetime.split(' ');

    // Tách ngày thành các thành phần
    const [day, month, year] = date.split('/');

    // Tạo đối tượng Date mới (lưu ý: tháng trong JavaScript bắt đầu từ 0)
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}