// Chỉnh sửa lại giá hiển thị
export function formatCurrency(value) {
    // Đảm bảo giá trị đầu vào là chuỗi
    const numberString = value.toString();

    // Sử dụng Regular Expression để thêm dấu chấm sau mỗi 3 số từ phải sang trái
    const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formatted;
}