// Chỉnh sửa lại giá hiển thị
export function formatCurrency(value) {
    // Đảm bảo giá trị đầu vào là chuỗi
    const numberString = value.toString();

    // Sử dụng Regular Expression để thêm dấu chấm sau mỗi 3 số từ phải sang trái
    const formatted = numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return formatted + ' đ';
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
    const result = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

    return date
}


export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');

    // Chuyển hoa thành chữ thường
    str = str.toLowerCase();

    // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/\s+/g, '-');

    return str;
}


export function convertToUrlSlug(str) {
    if (!str) return '';

    return str
        .toLowerCase()
        .trim()
        .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
        .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
        .replace(/[ìíịỉĩ]/g, 'i')
        .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
        .replace(/[ùúụủũưừứựửữ]/g, 'u')
        .replace(/[ỳýỵỷỹ]/g, 'y')
        .replace(/[đ]/g, 'd')
        .replace(/\s+/g, '-')     // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/[^\w-]+/g, '')  // Loại bỏ các ký tự đặc biệt
        .replace(/--+/g, '-')     // Loại bỏ nhiều dấu gạch ngang liên tiếp
        .replace(/^-+/, '')       // Loại bỏ dấu gạch ngang ở đầu
        .replace(/-+$/, '');      // Loại bỏ dấu gạch ngang ở cuối
}