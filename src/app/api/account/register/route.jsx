import { register } from '@app/actions';
import { hashPassword } from '@lib/actions';
import { NextResponse } from "next/server";
// /app/api/account/register/route.js
export default async function POST(request) {
    try {
        let data = await request.json(); // Nhận dữ liệu từ request body
        console.log('Received: ', data);
        data = { ...data, password: hashPassword(data.password) }
        // Thực hiện đăng ký và nhận lại kết quả
        const response = register(data)

        return response
    } catch (error) {
        // Xử lý lỗi
        return NextResponse.json({
            message: 'Lỗi xử lý',
            error: error
        }, { status: 500 })
    }

}
