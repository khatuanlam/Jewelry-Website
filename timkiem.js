document.addEventListener("DOMContentLoaded", () => {
  const products = Array.from(document.querySelectorAll(".product-card"));
  const paginationLinks = document.querySelectorAll(".pagination a");
  const searchInput = document.getElementById("search-text");
  const searchButton = document.getElementById("search-button");
  const itemsPerPage = 8;

  let filteredProducts = products;
  const noResultDiv = document.createElement("div");
  noResultDiv.className = "no-result";
  noResultDiv.innerHTML =
    "Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn.<br>" +
    "Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!";

  function calculateTotalPages(productList) {
    return Math.ceil(productList.length / itemsPerPage);
  }

  function updatePagination(productList) {
    const totalPages = calculateTotalPages(productList);
    paginationLinks.forEach((link, index) => {
      if (index < totalPages) {
        link.style.display = "inline-block";
      } else {
        link.style.display = "none";
      }
    });
  }

  function showPage(productList, pageNumber) {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    products.forEach((product) => (product.style.display = "none"));

    productList.slice(startIndex, endIndex).forEach((product) => {
      product.style.display = "block";
    });
  }

  function searchProducts(keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();

    filteredProducts = products.filter((product) => {
      const productName = product.querySelector("h3")
        ? product.querySelector("h3").textContent.toLowerCase()
        : "";
      return productName.includes(lowerCaseKeyword);
    });

    const existingNoResultDiv = document.querySelector(".no-result");

    if (filteredProducts.length > 0) {
      // Xóa thông báo không tìm thấy nếu có
      if (existingNoResultDiv) {
        existingNoResultDiv.remove();
      }
      updatePagination(filteredProducts);
      showPage(filteredProducts, 1);
    } else {
      // Hiển thị thông báo không tìm thấy nếu chưa có
      if (!existingNoResultDiv) {
        document.body.appendChild(noResultDiv);
      }
      products.forEach((product) => (product.style.display = "none"));
      paginationLinks.forEach((link) => (link.style.display = "none"));
    }
  }

  paginationLinks.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (index < calculateTotalPages(filteredProducts)) {
        showPage(filteredProducts, index + 1);
      }
    });
  });

  searchButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    const keyword = searchInput.value.trim();
    if (keyword) {
      searchProducts(keyword);
    } else {
      // Nếu không có từ khóa, hiển thị lại tất cả sản phẩm và ẩn thông báo lỗi
      const existingNoResultDiv = document.querySelector(".no-result");
      if (existingNoResultDiv) {
        existingNoResultDiv.remove();
      }
      filteredProducts = products;
      updatePagination(products);
      showPage(products, 1);
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const keyword = searchInput.value.trim();
      if (keyword) {
        searchProducts(keyword);
      } else {
        // Nếu không có từ khóa, hiển thị lại tất cả sản phẩm
        const existingNoResultDiv = document.querySelector(".no-result");
        if (existingNoResultDiv) {
          existingNoResultDiv.remove();
        }
        filteredProducts = products;
        updatePagination(products);
        showPage(products, 1);
      }
    }
  });

  // Hiển thị trang đầu tiên mặc định
  updatePagination(products);
  showPage(products, 1);
});
