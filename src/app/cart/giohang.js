// document.addEventListener("DOMContentLoaded", function () {

//     const payButton = document.getElementById('pay-button');
//     const agreeCheckbox = document.getElementById('check');
// //thong bao dong y
//     if (payButton) {
//         payButton.addEventListener('click', function (e) {
//             e.preventDefault();
//             console.log('Nút thanh toán đã được nhấn.');

//             if (!agreeCheckbox.checked) {
//                 alert('Vui lòng đồng ý với điều khoản dịch vụ trước khi thanh toán.');
//                 return;
//             }
//         // chuyen qua trang thanh toan neu trong gio hang co san pham, va da dong y voi dieu khoan
//             const cart = getCart();
//             if (cart.length > 0) {
//                 sessionStorage.setItem('cart', JSON.stringify(cart));
//                 window.location.href = 'thanhtoan.html';
//             }
//         });
//     }

// //dieu khoan dich vu
//     var modal = document.getElementById("mymodal");
//     var btn = document.getElementById("showterms");
//     var span = document.getElementsByClassName("close")[0];

//     if (btn) {
//         btn.onclick = function () {
//             modal.style.display = "block";
//         }
//     }

//     if (span) {
//         span.onclick = function () {
//             modal.style.display = "none";
//         }
//     }

//     window.onclick = function (event) {
//         if (event.target == modal) {
//             modal.style.display = "none";
//         }
//     }


// // ham de lay san pham qua gio hang
//     function getCart() {
//         const cart = sessionStorage.getItem('cart');
//         console.log('Getting cart:', cart);
//         return cart ? JSON.parse(cart) : [];
//     }

//     function addToCart(product) {
//         const cart = getCart();
//         cart.push(product);
//         sessionStorage.setItem('cart', JSON.stringify(cart));
//         console.log('Cart after adding product:', cart);
//         showSuccessMessage('Thêm sản phẩm vào giỏ thành công!');
//         updateCart();
//     }

//     function updateCart() {
//         const cart = getCart();
//         const cartCount = cart.length;

//         const productCount = {};
//         let cartTotal = 0;

//         cart.forEach(item => {
//             cartTotal += item.price;
//             if (productCount[item.name]) {
//                 productCount[item.name].quantity += 1;
//             } else {
//                 productCount[item.name] = { price: item.price, quantity: 1 };
//             }
//         });

//         const cartCountElement = document.querySelector('.cart-count');
//         if (cartCountElement) {
//             cartCountElement.textContent = cartCount;
//         }

//         const orderCountElement = document.querySelector('.order-count');
//         if (orderCountElement) {
//             orderCountElement.textContent = cartCount;
//         }

//         const tmpElement = document.querySelector('.tmp');
//         if (tmpElement) {
//             tmpElement.textContent = cartTotal;
//         }

//         const payButton = document.getElementById('pay-button');
//         if (payButton) {
//             if (cartCount === 0) {
//                 payButton.disabled = true;
//                 payButton.classList.add('disabled');
//             } else {
//                 payButton.disabled = false;
//                 payButton.classList.remove('disabled');
//             }
//         }

//         displayCartItems(productCount);
//         console.log('Cart updated:', productCount);
//     }

//     function displayCartItems(productCount) {
//         const cartItemsContainer = document.querySelector('.cart-items');
//         if (cartItemsContainer) {
//             cartItemsContainer.remove();
//         }

//         const newCartItemsContainer = document.createElement('div');
//         newCartItemsContainer.className = 'cart-items';

//         if (Object.keys(productCount).length === 0) {
//             const continueDiv = document.createElement('div');
//             continueDiv.className = 'continue';
//             document.querySelector('.cart-left').appendChild(continueDiv);
//         } 
//         else {
//             const continueDiv = document.querySelector('.continue');
//             if (continueDiv) {
//                 continueDiv.style.display = 'none';
//             }

//             for (const [name, { price, quantity }] of Object.entries(productCount)) {
//                 const itemElement = document.createElement('div');
//                 itemElement.className = 'cart-item';
//                 itemElement.innerHTML = `
//                     <h4>${name}</h4>
//                     <p>Giá: ${price} đ</p>
//                     <p>
//                     Số lượng: ${quantity}</p> <button class="remove-from-cart" data-name="${name}" data-price="${price}">Xóa</button> 
//                     </p>
//                 `;
//                 newCartItemsContainer.appendChild(itemElement);
//             }
//         }

//         const cartLeft = document.querySelector('.cart-left');
//         if (cartLeft) {
//             cartLeft.appendChild(newCartItemsContainer);
//         }

//         document.querySelectorAll('.remove-from-cart').forEach(button => {
//             button.addEventListener('click', () => {
//                 const productName = button.getAttribute('data-name');
//                 removeFromCart(productName);
//             });
//         });
//     }

//     function removeFromCart(name) {
//         const cart = getCart();
//         const updatedCart = cart.map(item => {
//             if (item.name === name) {
//                 if (item.quantity > 1) {
//                     return { ...item, quantity: item.quantity - 1 };
//                 }
//                 return null; 
//             }
//             return item;
//         }).filter(item => item !== null);

//         sessionStorage.setItem('cart', JSON.stringify(updatedCart));
//         updateCart();
//     }

//     if (document.title === "Giỏ hàng") {
//         updateCart();
//     }

//     const addButtons = document.querySelectorAll('.add-to-cart');
//     addButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const product = {
//                 name: button.getAttribute('data-name'),
//                 price: parseFloat(button.getAttribute('data-price'))
//             };
//             addToCart(product);
//             console.log('Sản phẩm đã được thêm:', product);
//         });
//     });
// });