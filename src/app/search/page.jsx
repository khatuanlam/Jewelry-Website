"use client"; // Đảm bảo đây là Client Component

import { Card, CardContent } from "@/components/ui/card";
import products from "@/content/products.json";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams(); // Lấy searchParams từ URL
    const itemsPerPage = 8; // Hiển thị 8 sản phẩm mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const query = searchParams.get('query')?.toLowerCase() || ''; // Lấy query từ URL

    const normalizeString = (str) => {
        return str.trim().toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/gi, '');  // Bỏ tất cả các ký tự đặc biệt
    };    

    // Lọc sản phẩm gần đúng dựa trên query
    useEffect(() => {
        if (query) {
            const normalizedQuery = normalizeString(query);  // Chuẩn hóa từ khóa tìm kiếm
            const queryWords = normalizedQuery.split(' '); // Tách từ khóa thành các từ
            
            const filtered = products.filter(product => {
                const normalizedName = normalizeString(product.name);  // Chuẩn hóa tên sản phẩm
    
                // Kiểm tra nếu tất cả từ trong từ khóa xuất hiện trong tên sản phẩm
                return queryWords.every(word => {
                    const regex = new RegExp(`\\b${word}\\b`, 'i');  // Tạo một biểu thức chính quy cho từ khóa
                    return regex.test(normalizedName);
                });
            });
    
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [query]);    

    // Tính tổng số trang
    const calculateTotalPages = (productList) => {
        return Math.ceil(productList.length / itemsPerPage);
    };

    const totalPages = calculateTotalPages(filteredProducts);

    // Hiển thị sản phẩm cho mỗi trang
    const showPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredProducts.slice(startIndex, endIndex);
    };

    const displayedProducts = showPage(currentPage);

    // Chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mx-auto px-4">
            <header>
                <h1 className="text-4xl font-bold my-6 text-center">TÌM KIẾM</h1>
            </header>
            <main className="py-8 flex flex-col items-center">
                {filteredProducts.length === 0 ? (
                    <div className="text-center text-red-500 mt-10">
                    <p className="text-lg font-medium leading-tight">Rất tiếc, chúng tôi không tìm thấy kết quả cho từ khóa của bạn.</p>
                    <p className="text-lg font-medium leading-tight">Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại!</p>
                </div>                
                ) : (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                            {displayedProducts.map((product) => (
                                <Card key={product.id} className="product-card max-w-xs">
                                    <CardContent className="p-5">
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
                    </>
                )}
            </main>
        </div>
    );
}
