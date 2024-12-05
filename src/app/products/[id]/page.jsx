'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@components/ui/card"
import AuthContext from "@contexts/auth/AuthContext"
import ThemeContext from "@contexts/ThemeContext"
import { getProductById } from "@services/page"
import { formatCurrency } from "@utils/page"
import Link from 'next/link'
import { ChevronRight, Heart, Minus, Plus, Share2 } from 'lucide-react'
import Image from "next/image"
import { useCallback, useContext, useEffect, useState } from 'react'

// Import dữ liệu sản phẩm từ file JSON
import productsData from "@/content/products.json"

export default function ProductDetail({ params }) {
    const { isLoggedIn } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)
    const { router } = useContext(ThemeContext)

    // Lấy sản phẩm hiện tại
    const baseProduct = getProductById(params.id)

    // Lọc các sản phẩm liên quan dựa trên thuộc tính category
    const relatedProducts = productsData.filter(
        (item) => item.category === baseProduct.category && item.id !== baseProduct.id
    )

    const [addToCart, setAddToCart] = useState('Thêm vào giỏ hàng')
    const addToCartAction = useCallback(() => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.")
            return
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingProduct = cart.find(item => item.id === baseProduct.id)

        if (existingProduct) {
            existingProduct.quantity += quantity
        } else {
            cart.push({
                ...baseProduct,
                quantity,
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        setAddToCart('Đã thêm vào giỏ hàng')
    }, [isLoggedIn, baseProduct, quantity])

    useEffect(() => {
        if (addToCart === 'Đã thêm vào giỏ hàng') {
            const timer = setTimeout(() => {
                setAddToCart('Thêm vào giỏ hàng')
            }, 2000)
            return () => clearTimeout(timer)
        }
    }, [addToCart])

    const buyNowAction = useCallback(() => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để mua hàng.")
            return
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingProduct = cart.find(item => item.id === baseProduct.id)

        if (existingProduct) {
            existingProduct.quantity += quantity
        } else {
            cart.push({
                ...baseProduct,
                quantity,
            })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        router.push("/cart")
    }, [isLoggedIn, baseProduct, quantity, router])

    const product = {
        ...baseProduct,
        details: [
            { label: "Chất liệu", value: "Bạc 925 sterling" },
            { label: "Màu sắc", value: "Bạc" },
            { label: "Đá", value: "Cubic Zirconia" },
            { label: "Kích thước", value: "Đường kính: 3.1cm" },
        ],
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Breadcrumb */}
            <nav className="py-4 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary">Trang chủ</a>
                        <ChevronRight className="h-4 w-4" />
                        <a href="#" className="hover:text-primary">Charms</a>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-foreground">{product.name}</span>
                    </div>
                </div>
            </nav>

            {/* Product Details */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Images */}
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src={product.images[currentImage]}
                                    alt={product.name}
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`aspect-square overflow-hidden rounded-lg border-2 ${index === currentImage ? 'border-primary' : 'border-transparent'
                                            }`}
                                        onClick={() => setCurrentImage(index)}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            width={600}
                                            height={600}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-2xl font-semibold">{`${formatCurrency(product.price)} VNĐ`}</p>
                            <p className="text-sm text-muted-foreground">Thương hiệu: {product.brand}</p>

                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border rounded-md">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        className="w-16 text-center border-none"
                                    />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setQuantity(quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <Button className="flex-1" onClick={addToCartAction}>{addToCart}</Button>
                                <Button
                                    className="flex-1 bg-slate-50 text-black hover:bg-slate-800 hover:text-white"
                                    onClick={() => buyNowAction()}
                                >
                                    Mua ngay
                                </Button>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger>Mô tả sản phẩm</AccordionTrigger>
                                    <AccordionContent>
                                        {product.description}
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="details">
                                    <AccordionTrigger>Thông số kỹ thuật</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-2">
                                            {product.details.map((detail, index) => (
                                                <li key={index} className="flex">
                                                    <span className="font-medium w-1/3">{detail.label}:</span>
                                                    <span>{detail.value}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="shipping">
                                    <AccordionTrigger>Vận chuyển & Đổi trả</AccordionTrigger>
                                    <AccordionContent>
                                        <p>Miễn phí vận chuyển cho đơn hàng trên 2.000.000₫</p>
                                        <p>Đổi trả miễn phí trong vòng 30 ngày</p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

          
            {/* Related Products */}
            <section className="py-12 bg-muted">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8">Sản phẩm liên quan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((item) => (
                <div key={item.id} className="relative group">
                    <Card>
                        <CardContent className="p-0">
                            <Image
                                src={item.images[0]}
                                alt={item.name}
                                className="w-full h-48 object-cover"
                                width={300}
                                height={300}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-start p-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <span className="mt-2 font-bold">{formatCurrency(item.price)}</span>
                        </CardFooter>
                    </Card>
                    {/* Bao bọc trong Link để điều hướng đến trang chi tiết sản phẩm */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/products/${item.id}`} className="text-white text-lg font-semibold">
                            Xem chi tiết sản phẩm
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>
        </div>
    )
}
