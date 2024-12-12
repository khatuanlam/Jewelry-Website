import { login } from "@app/actions";
import { hashPassword } from "@lib/actions";
import { NextResponse } from "next/server";

// /app/api/account/login/route.js
export default async function POST(request) {
    try {
        let data = await request.json(); // Nhận dữ liệu từ request body
        console.log('Received: ', data);
        data = { ...data, login_password: hashPassword(data.login_password) }
        // Lưu lại trạng thái đăng nhập
        const response = login(data)

        return response
    } catch (error) {
        // Xử lý lỗi
        return NextResponse.json({
            message: 'Lỗi xử lý',
            error: error
        }, { status: 500 })
    }

}
