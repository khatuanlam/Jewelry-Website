'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import productsData from "@/content/products.json"
import PaginatePage from "@components/RootLayout/Pagination"
import AuthContext from "@contexts/auth/AuthContext"
import ThemeContext from "@contexts/ThemeContext"
import { getProductById } from "@services/page"
import { formatCurrency } from "@utils/page"
import { ChevronRight, Minus, Plus } from 'lucide-react'
import Image from "next/image"
import { useCallback, useContext, useEffect, useState } from 'react'

export default function ProductDetail({ params }) {
    const { isLoggedIn } = useContext(AuthContext)
    const { router, setShowNotification } = useContext(ThemeContext)
    const [quantity, setQuantity] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)
    const [addToCart, setAddToCart] = useState('Thêm vào giỏ hàng')

    const baseProduct = getProductById(params.id)
    const relatedProducts = productsData.filter(
        item => item.category === baseProduct.category && item.id !== baseProduct.id
    )

    const updateCart = useCallback((redirectToCart = false) => {
        if (!isLoggedIn) {
            setShowNotification('Vui lòng đăng nhập để mua hàng')
            return
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingProduct = cart.find(item => item.id === baseProduct.id)

        if (existingProduct) {
            existingProduct.quantity += quantity
        } else {
            cart.push({ ...baseProduct, quantity })
        }

        localStorage.setItem("cart", JSON.stringify(cart))
        setAddToCart('Đã thêm vào giỏ hàng')

        if (redirectToCart) {
            router.push("/cart")
        }
    }, [isLoggedIn, setShowNotification, baseProduct, quantity, router])

    useEffect(() => {
        if (isLoggedIn) {
            const timer = setTimeout(() => setAddToCart('Thêm vào giỏ hàng'), 2000)
            return () => clearTimeout(timer)
        }
    }, [addToCart, isLoggedIn])

    const product = {
        ...baseProduct,
        details: [
            { label: "Chất liệu", value: baseProduct.material },
            { label: "Màu sắc", value: baseProduct.color },
            { label: "Đá", value: "Cubic Zirconia" },
            { label: "Kích thước", value: "Đường kính: 3.1cm" },
        ],
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
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
                                        className={`aspect-square overflow-hidden rounded-lg border-2 
                                            ${index === currentImage ? 'border-primary' : 'border-transparent'}`}
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
                            <p className="text-2xl font-semibold">{formatCurrency(product.price)} VNĐ</p>
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
                                <Button className="flex-1" onClick={() => updateCart()}>{addToCart}</Button>
                                <Button
                                    className="flex-1 bg-slate-50 text-black hover:bg-slate-800 hover:text-white"
                                    onClick={() => updateCart(true)}
                                >
                                    Mua ngay
                                </Button>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="description">
                                    <AccordionTrigger>Mô tả sản phẩm</AccordionTrigger>
                                    <AccordionContent>{product.description}</AccordionContent>
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
            <section className="bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <PaginatePage value={relatedProducts} tab={<span className="text-black">Sản phẩm liên quan</span>} title={false} />
                </div>
            </section>
        </div>
    )
}