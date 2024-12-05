'use server'

import { orders, products, users } from '@content';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';
const usersPath = path.join(process.cwd(), 'src/content/users.json');
const ordersPath = path.join(process.cwd(), 'src/content/orders.json');
const productsPath = path.join(process.cwd(), 'src/content/orders.json');
export async function login(account) {
    try {
        // Xác định người dùng có tài khoản chưa
        const result = await users.findIndex(user => user.email === account.login_email)

        if (result === -1) {
            return NextResponse.json({
                message: 'Tên email không chính xác'
            }, { status: 404 })
        }


        // Kiểm tra mật khẩu
        if (users[result].password !== account.login_password) {
            return NextResponse.json({
                message: 'Mật khẩu không chính xác'
            }, { status: 401 })
        }

        // Kiểm tra người dùng có bị khóa không 
        if (users[result].isLock) {
            return NextResponse.json({
                message: 'Tài khoản đã bị khóa'
            }, { status: 202 })
        }

        // Cập nhật lại trạng thái hoạt động của người dùng
        users[result].active = true
        fs.writeFileSync(usersPath, JSON.stringify(users, null, 2))

        return NextResponse.json({
            message: `Xin chào ${account.login_email} đã đăng nhập thành công`,
            updateUser: users[result]
        }, { status: 200 })
    } catch (error) {

        console.error('Error writing file:', error);
    }
}
export async function register(account) {
    try {
        account = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            ...account
        }
        // Ghi dữ liệu vào file users.json
        users.push(account)

        const jsonString = JSON.stringify(users, null, 2)

        fs.writeFileSync(usersPath, jsonString, 'utf8')

        return NextResponse.json({
            message: 'User is register successfully',
            updateUser: account
        }, { status: 200 })
    } catch (error) {
        console.error('Error writing file:', error);
    }
}

export async function take_order(order) {
    // Thêm đơn hàng mới
    const updatedOrders = [...orders, { id: orders.length + 1, ...order }];

    // Ghi lại file JSON
    fs.writeFileSync(ordersPath, JSON.stringify(updatedOrders, null, 2), 'utf8');

    return NextResponse.json({
        message: 'Order added successfully',
    }, { status: 200 })
}

async function readUsersFile() {
    try {
        const data = await fs.readFile(usersPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
}

async function writeUsersFile(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
}


export async function getUsers() {
    return await readUsersFile()
}



export async function addUser(newUser) {
    users.push(newUser)
    await writeUsersFile(users)
    return users
}

export async function editUser(index, updatedUser) {

    users[index] = updatedUser
    await writeUsersFile(users)
    return users
}


export async function addProduct(newProduct) {

    const updatedProducts = [...products, { id: products.length + 1, ...newProduct }];
    fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');
    return updatedProducts;
}

export async function editProduct(updatedProduct) {

    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = updatedProduct;
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
    }
    return products;
}

export async function deleteProduct(productId) {

    const updatedProducts = products.filter(p => p.id !== productId);
    fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2), 'utf8');
    return updatedProducts;
}

export async function toggleUserStatus(index) {
    users[index].isLock = !users[index].isLock
    users[index].active = false
    await writeUsersFile(users)
    return users
}