
import { take_order } from '@app/actions';
import { NextResponse } from 'next/server';


export async function POST(request) {
    try {
        const newOrder = await request.json(); // Lấy đơn hàng mới từ request body
        console.log('Order Received', newOrder);

        const response = take_order(newOrder)

        return response
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to add order', details: error.message
        }, { status: 500 })
    }

}
