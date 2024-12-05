'use server'
import { login } from "@app/actions";
import { NextResponse } from "next/server";

// /app/api/account/login/route.js
export async function POST(request) {
    try {
        const data = await request.json(); // Nhận dữ liệu từ request body
        console.log('Received: ', data);

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
