'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronRight, Heart, Minus, Plus, Share2 } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetail({ params }) {
    const [quantity, setQuantity] = useState(1)
    const [currentImage, setCurrentImage] = useState(0)

    const product = {
        name: params.name,
        price: "1.590.000₫",
        sku: "791735CZ",
        images: [
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
            "/placeholder.svg?height=600&width=600",
        ],
        description: "Charm bạc Pandora Moments Dream Catcher là một tác phẩm tinh xảo, được chế tác từ bạc 925 sterling. Thiết kế lấy cảm hứng từ những chiếc dreamcatcher truyền thống, với những sợi dây đan xen tinh tế và điểm xuyết bởi những viên đá cubic zirconia lấp lánh. Charm này không chỉ là một món trang sức mà còn mang ý nghĩa về những giấc mơ và hy vọng, là món quà ý nghĩa cho bản thân hoặc người thân yêu.",
        details: [
            { label: "Chất liệu", value: "Bạc 925 sterling" },
            { label: "Màu sắc", value: "Bạc" },
            { label: "Đá", value: "Cubic Zirconia" },
            { label: "Kích thước", value: "Đường kính: 3.1cm" },
        ],
    }

    const relatedProducts = [
        { id: 1, name: "Vòng tay Pandora Moments", price: "2.090.000₫" },
        { id: 2, name: "Charm bạc Pandora Butterfly", price: "1.290.000₫" },
        { id: 3, name: "Hoa tai Pandora Sparkling", price: "1.790.000₫" },
        { id: 4, name: "Nhẫn bạc Pandora Crown", price: "1.390.000₫" },
    ]

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header would go here (same as homepage) */}

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
                                <img
                                    src={product.images[currentImage]}
                                    alt={product.name}
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
                                        <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold">{product.name}</h1>
                            <p className="text-2xl font-semibold">{product.price}</p>
                            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>

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
                                <Button className="flex-1">Thêm vào giỏ hàng</Button>
                            </div>

                            <div className="flex space-x-4">
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
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
                        {relatedProducts.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-0">
                                    <img src={`/placeholder.svg?height=300&width=300`} alt={item.name} className="w-full h-48 object-cover" />
                                </CardContent>
                                <CardFooter className="flex flex-col items-start p-4">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <span className="mt-2 font-bold">{item.price}</span>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer would go here (same as homepage) */}
        </div>
    )
}