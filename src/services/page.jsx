import { orders, products, users } from "@content";

//Tìm người dùng theo thuộc tính
const findUserByEmail = (email) => users.find(user => user.email == email);
const findUserById = (id) => users.find(user => user.id == id)

// Tìm sản phẩm theo thuộc tính
const getProductById = (id) => products.find(product => product.id == id);
const getProductsByCollection = (collection) =>
    products.filter(product => product.collection === collection);

// Tìm lịch sử đơn hàng 
const getHistoryOrder = (id) => orders.filter(order => order.owner?.id === id)

export {
    findUserByEmail, findUserById, getHistoryOrder, getProductById, getProductsByCollection
};



