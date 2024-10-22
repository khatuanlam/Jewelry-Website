'use server'

import { signIn } from "next-auth/react";

export async function login(__currentState, formData) {

    const data = new FormData(formData)
    // Log tất cả các giá trị trong formData
    const email = data.get('login_email'); // Lấy giá trị email
    const password = data.get('login_password'); // Lấy giá trị password

    console.log('Form Data:');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        const result = await signIn('credentials', {
            email: email, // Sử dụng giá trị email đã lấy
            password: password // Thêm password vào đây
        });

        if (result.ok) {
            console.log("Login successful");
        } else {
            console.log("Login failed", result.error);
        }
    } catch (error) {
        if (error) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error;
    }
}


export async function register(__currentState, formData) {

}
