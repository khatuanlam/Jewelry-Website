
import { orders, products, users } from '@content';
import { verifyPassword } from '@lib/actions';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
const usersPath = path.join('/tmp', 'src/content/users.json');
const ordersPath = path.join('/tmp', 'src/content/orders.json');
const productsPath = path.join('/tmp', 'src/content/products.json');

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
        if (!verifyPassword(users[result].password, account.login_password)) {
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


export async function editOrder(updatedOrder) {
    const index = await orders.findIndex(o => o.id === updatedOrder.id);
    if (index !== -1) {
        orders[index] = { ...orders[index], ...updatedOrder };
        fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2), 'utf8');
    }
    return orders;
}

export async function editProduct(updatedProduct) {
    const index = await products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
    } else {
        console.log('updatedProduct:', updatedProduct);
        console.log('Không tìm thấy sản phẩm ');
    }
    return products;
}

export async function filterOrders(startDate, endDate, status) {
    return orders.filter(order => {
        const orderDate = new Date(order.createAt);
        const isInDateRange = (!startDate || orderDate >= new Date(startDate)) &&
            (!endDate || orderDate <= new Date(endDate));
        const matchesStatus = !status || order.status === status;
        return isInDateRange && matchesStatus;
    });
}


async function writeUsersFile(users) {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), 'utf8');
}

async function writeProductsFile(products) {
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');

}
export async function addUser(newUser) {
    const result = await users.findIndex(u => u.email === newUser.email)
    if (result != -1) {
        users.push({ id: users.length + 1, ...newUser })
        await writeUsersFile(users)
    }
    else {
        console.log('Email bị trùng');
    }
    return users
}

export async function editingUser(index, updatedUser) {
    users[index] = updatedUser
    await writeUsersFile(users)
    return users
}


export async function addProduct(newProduct) {
    const index = await products.findIndex(p => p.id === newProduct.id);
    if (index === -1) {
        products.push({ id: products.length + 1, ...newProduct });
        await writeProductsFile(products)
    } else {
        console.log('Sản phẩm đã được thêm vào ');
    }

    return products
}



export async function deleteProduct(productId) {
    const updatedProducts = products.filter(p => p.id !== productId);
    await writeProductsFile(updatedProducts)
    return updatedProducts;
}


export async function toggleUserStatus(index) {
    users[index].isLock = !users[index].isLock
    users[index].active = false
    await writeUsersFile(users)
    return users
}