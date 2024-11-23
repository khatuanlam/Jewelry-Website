'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function navigate() {
    try {
        console.log('navigate is call');
    } catch (error) {
        console.log(error);
    }

    // Nhận từ đường dẫn
    revalidatePath('/account')

    // Chuyển đến đường dẫn 
    redirect('/account')
}


// export async function setCookies(data) {
//     const cookieStore = await cookies()

//     // Lưu giá trị đăng nhập
//     cookieStore.set('currentUser', data, { secure: true })
// }