import { register } from '@app/actions';
import { hashPassword } from '@lib/actions';
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const data = await request.json();
        console.log('Received (Register):', data);

        const hashedPassword = hashPassword(data.password);
        const response = await register({ ...data, password: hashedPassword }); // Await the register promise

        if (response.status === 200) { // 201 Created is the typical success status for registration
            const responseData = await response.json();
            return NextResponse.json(responseData, { status: 201 });
        } else if (response.status === 400) { // Handle 400 Bad Request (e.g., validation errors)
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: 400 });
        } else if (response.status === 409) { // Handle 409 Conflict (e.g., email already exists)
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: 409 });
        }
        else {
            return NextResponse.json({ message: "Registration failed" }, { status: response.status || 500 }); // General error handling
        }

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: 'An unexpected error occurred during registration' }, { status: 500 });
    }
}