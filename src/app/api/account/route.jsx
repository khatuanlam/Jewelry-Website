'use server'
import navigate from "@app/actions";
import { NextResponse } from "next/server";

// /app/api/account/route.js
export async function POST(request) {
    try {
        console.log(request);
        const data = await request.json(); // Nhận dữ liệu từ request body
        console.log('Received: ', data);
        await navigate()
        // Xử lý dữ liệu tại đây và trả về phản hồi
        return NextResponse.json({
            message: 'Success',
            receivedData: data
        }, { status: 200 })
    } catch (error) {
        // Xử lý lỗi
        return NextResponse.json({
            message: 'Lỗi xử lý',
            error: error
        }, { status: 500 })
    }

}
