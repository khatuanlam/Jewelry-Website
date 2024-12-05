'use server'
import { register } from '@app/actions';
import { NextResponse } from "next/server";

// /app/api/account/register/route.js
export async function POST(request) {
    try {
        let response = undefined
        const data = await request.json(); // Nhận dữ liệu từ request body
        console.log('Received: ', data);

        // Thực hiện đăng ký và nhận lại kết quả
        response = register(data)

        return response
    } catch (error) {
        // Xử lý lỗi
        return NextResponse.json({
            message: 'Lỗi xử lý',
            error: error
        }, { status: 500 })
    }

}
