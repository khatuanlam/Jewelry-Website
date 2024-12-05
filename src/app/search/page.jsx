"use client";  // Đảm bảo đây là Client Component

import { Card, CardContent } from "@/components/ui/card";
import products from "@/content/products.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchPage() {
    const itemsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState("");

    // Tính tổng số trang
    const calculateTotalPages = (productList) => {
        return Math.ceil(productList.length / itemsPerPage);
    };

    // Cập nhật phân trang
    const updatePagination = () => {
        return calculateTotalPages(filteredProducts);
    };

    // Hiển thị sản phẩm cho mỗi trang
    const showPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    };

    // Tìm kiếm sản phẩm
    const searchProducts = (keyword) => {
        const lowerCaseKeyword = keyword.toLowerCase();
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseKeyword)
        );
        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
    };

    // Xử lý tìm kiếm
    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchKeyword.trim() !== "") {
            searchProducts(searchKeyword);
        } else {
            setFilteredProducts(products); // Hiển thị lại tất cả sản phẩm nếu không có từ khóa
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setCurrentPage(1); // Reset trang về 1 mỗi khi sản phẩm thay đổi
    }, [filteredProducts]);

    const displayedProducts = showPage(currentPage);
    const totalPages = updatePagination();

    return (
        <div className="container mx-auto px-4">
            <header>
                <h1 className="text-4xl font-bold my-6 text-center">TÌM KIẾM</h1>
            </header>
            <main className="py-8 mx-20">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    {displayedProducts.map((product) => (
                        <Card key={product.id} className="product-card">
                            <CardContent className="p-4">
                                <Link href={`/products/${product.id}`}>
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={200}
                                        height={200}
                                        className="w-full h-auto object-cover mb-2"
                                    />
                                    <h3 className="text-sm font-medium">{product.name}</h3>
                                </Link>
                                <p className="text-sm text-gray-500">{product.price.toLocaleString("vi-VN")}₫</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="no-result text-center my-6">
                        <p>
                            Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn.
                            Vui lòng kiểm tra chính tả và thử lại!
                        </p>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <nav aria-label="Pagination" className="inline-flex">
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-2 mx-1 text-sm font-medium border rounded-md 
                ${currentPage === index + 1
                                        ? "bg-gray-300 text-white"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </nav>
                </div>
            </main>
        </div>
    );
}