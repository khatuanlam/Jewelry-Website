document.addEventListener("DOMContentLoaded", function() {
  const payButton = document.getElementById('pay-button');
  const agreeCheckbox = document.getElementById('check');

  // Kiểm tra xem các phần tử có tồn tại không trước khi gán sự kiện
  if (payButton) {
      payButton.addEventListener('click', function() {
          console.log('Nút thanh toán đã được nhấn.'); 
          if (!agreeCheckbox.checked) {
              alert('Vui lòng đồng ý với điều khoản dịch vụ trước khi thanh toán.');
          } else {
              window.location.href = 'link-thanh-toan'; 
          }
      });
  }

  // Điều khoản dịch vụ
  var modal = document.getElementById("mymodal");
  var btn = document.getElementById("showterms");
  var span = document.getElementsByClassName("close")[0]; 

  if (btn) {
      btn.onclick = function() {
          modal.style.display = "block";
      }
  }

  if (span) {
      span.onclick = function() {
          modal.style.display = "none";
      }
  }

  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

  // Hàm để lấy giỏ hàng từ localStorage
  function getCart() {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
  }

  // Hàm để cập nhật giỏ hàng
  function updateCart() {
      const cart = getCart();
      const cartCount = cart.length;
      const cartTotal = cart.reduce((total, item) => total + item.price, 0);

      // Cập nhật số lượng sản phẩm trong giỏ hàng
      const itemCountElement = document.querySelector('.item-count');
      if (itemCountElement) {
          itemCountElement.textContent = cartCount;
      }

      // Cập nhật tổng tạm tính
      const tmpElement = document.querySelector('.tmp');
      if (tmpElement) {
          tmpElement.textContent = cartTotal;
      }
  }

  // Hàm để thêm sản phẩm vào giỏ hàng
  function addToCart(name, price) {
      const cart = getCart();
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      console.log('Giỏ hàng sau khi thêm:', cart); // Kiểm tra giỏ hàng sau khi thêm
      updateCart();
  }

  // Thêm sự kiện cho các nút "Thêm vào giỏ"
  if (document.querySelectorAll('.add-to-cart')) {
      document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', () => {
              const productName = button.getAttribute('data-name');
              const productPrice = parseInt(button.getAttribute('data-price'));
              addToCart(productName, productPrice);
              console.log(`${productName} đã được thêm vào giỏ hàng`); // Kiểm tra thêm
          });
      });
  }

  // Cập nhật giỏ hàng khi trang giỏ hàng được tải
  if (document.title === "Giỏ hàng") {
      updateCart();
  }
});
