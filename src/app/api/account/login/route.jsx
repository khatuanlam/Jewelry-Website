import { login } from "@app/actions";
import { hashPassword } from "@lib/actions";
import { NextResponse } from "next/server";

export async function POST(request) { // Use named export for clarity
    try {
        const data = await request.json();
        console.log('Received:', data);

        const hashedPassword = hashPassword(data.login_password);
        const response = await login({ ...data, login_password: hashedPassword }); // Important: Await the login promise

        if (response.status === 200) {
            const responseData = await response.json();
            return NextResponse.json(responseData, { status: 200 }); // Correct return with data
        } else if (response.status === 401) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: 401 }); // Handle 401 Unauthorized
        } else if (response.status === 400) {
            const errorData = await response.json();
            return NextResponse.json({ message: errorData.message }, { status: 400 }); // Handle 400 Bad Request
        }
        else {
            return NextResponse.json({ message: "Login failed" }, { status: response.status || 500 }); // Handle other error status codes
        }

    } catch (error) {
        console.error("Login error:", error); // Log the full error for debugging
        return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
    }
}