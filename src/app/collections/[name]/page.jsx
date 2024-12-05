'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Filter, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const filters = [
    {
        name: 'Loại sản phẩm',
        options: ['Vòng tay', 'Charm'],
    },
    {
        name: 'Chất liệu',
        options: ['Bạc', 'Vàng', 'Vàng hồng', 'Thép không gỉ'],
    },
    {
        name: 'Giá',
        options: ['Dưới 1 triệu', '1 - 2 triệu', '2 - 5 triệu', 'Trên 5 triệu'],
    },
    {
        name: 'Bộ sưu tập',
        options: ['Mùa lễ hội', 'Sang trọng', 'Vintage', 'Tình yêu và tình bạn'],
    },
]

export default function CollectionPage() {
    const params = useParams();
    const collectionName = params?.name
        ? decodeURIComponent(params.name)
            .replace(/-/g, ' ')
            .replace(/^\w/, char => char.toUpperCase())
        : "Default Collection";
    
    const [activeFilters, setActiveFilters] = useState([])
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [displayedProducts, setDisplayedProducts] = useState(6)
    const router = useRouter()

    useEffect(() => {
        fetch('/products.json?cache-bust=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
                console.log("Tất cả sản phẩm:", data);
                console.log("Collection Name:", collectionName);

                const collectionFilteredProducts = data.filter(product => {
                    if (Array.isArray(product.collection)) {
                        return product.collection.includes(collectionName);
                    }
                    return product.collection === collectionName;
                });
                
                console.log("Sản phẩm theo bộ sưu tập:", collectionFilteredProducts);
    
                const filteredProducts = collectionFilteredProducts.filter(product => {
                    return activeFilters.every(filter => {
                        return (
                            product.category === filter ||
                            product.material === filter ||
                            priceRange(product.price) === filter ||
(Array.isArray(product.collection) ? product.collection.includes(filter) : product.collection === filter)
                        );
                    });
                });
    
                console.log("Sản phẩm sau khi lọc:", filteredProducts);
    
                setProducts(filteredProducts);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Error loading products");
                setLoading(false);
            });
    }, [collectionName, activeFilters]);
    
    const toggleFilter = (filter) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        )
    }

    const addToCart = (product) => {
        setCart(prevCart => [...prevCart, product])
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`)
        router.push('/cart')
    }

    const filteredProducts = products.filter(product => {
        return activeFilters.every(filter => {
            return product.category.includes(filter) || 
                   product.material.includes(filter) || 
                   product.priceRange.includes(filter) ||
                   product.collection.includes(filter)
        })
    })

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="min-h-screen bg-white text-black">
            {/* Collection Banner */}
            <section className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url('/lehoi.jpg')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">{collectionName}</h1>
                        <p className="text-xl">Khám phá bộ sưu tập trang sức {collectionName}</p>
                    </div>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filters - Desktop */}
                        <div className="w-full md:w-1/4 space-y-6 hidden md:block">
                            <h2 className="text-2xl font-bold text-black">Bộ lọc</h2>
                            {filters.map((filter) => (
                                <div key={filter.name}>
                                    <h3 className="font-semibold mb-2 text-black">{filter.name}</h3>
                                    <div className="space-y-2">
                                        {filter.options.map((option) => (
<div key={option} className="flex items-center">
                                                <Checkbox
                                                    id={option}
                                                    checked={activeFilters.includes(option)}
                                                    onCheckedChange={() => toggleFilter(option)}
                                                />
                                                <label htmlFor={option} className="ml-2 text-sm font-medium leading-none text-black">
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Products */}
                        <div className="w-full md:w-3/4">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-sm text-black">Hiển thị {filteredProducts.length} sản phẩm</p>
                                <div className="flex items-center gap-4">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sắp xếp" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
                                            <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
                                            <SelectItem value="name-asc">Tên: A-Z</SelectItem>
                                            <SelectItem value="name-desc">Tên: Z-A</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="md:hidden">
                                                <Filter className="mr-2 h-4 w-4" /> Bộ lọc
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent side="left">
                                            <SheetHeader>
                                                <SheetTitle>Bộ lọc</SheetTitle>
                                                <SheetDescription>
                                                    Lọc sản phẩm theo các tiêu chí
</SheetDescription>
                                            </SheetHeader>
                                            <div className="mt-4 space-y-6">
                                                {filters.map((filter) => (
                                                    <div key={filter.name}>
                                                        <h3 className="font-semibold mb-2 text-black">{filter.name}</h3>
                                                        <div className="space-y-2">
                                                            {filter.options.map((option) => (
                                                                <div key={option} className="flex items-center">
                                                                    <Checkbox
                                                                        id={`mobile-${option}`}
                                                                        checked={activeFilters.includes(option)}
                                                                        onCheckedChange={() => toggleFilter(option)}
                                                                    />
                                                                    <label htmlFor={`mobile-${option}`} className="ml-2 text-sm font-medium leading-none text-black">
                                                                        {option}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                            </div>

                            {/* Active Filters */}
                            {activeFilters.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {activeFilters.map((filter) => (
                                        <Button key={filter} variant="secondary" size="sm" onClick={() => toggleFilter(filter)}>
                                            {filter} <X className="ml-2 h-4 w-4" />
                                        </Button>
                                    ))}
                                    <Button variant="link" size="sm" onClick={() => setActiveFilters([])}>
                                        Xóa tất cả
                                    </Button>
                                </div>
                            )}

                            {/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProducts.slice(0, displayedProducts).map((product) => (
                                    <Card key={product.id} className="relative group">
                                        <Link href={`/product/${product.id}`}>
                                            <CardContent className="p-0 relative">
                                                {Array.isArray(product.images) && product.images.length > 0 ? (
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                                                        <span className="text-gray-500">Không có ảnh</span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <span className="text-white font-semibold">Xem chi tiết sản phẩm</span>
                                                </div>
                                            </CardContent>
                                            <CardFooter className="flex flex-col items-start p-4">
                                                <h3 className="font-semibold text-black">{product.name}</h3>
                                                {product.collection && !['vintage', 'Bộ sưu tập mới', 'Sang trọng', 'Tình yêu và tình bạn'].includes(product.collection) && (
                                                    <span className="text-sm text-gray-500">{product.collection}</span>
                                                )}
                                                <span className="mt-2 font-bold text-black">{product.price}</span>
                                            </CardFooter>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-4 absolute bottom-4 right-4"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product);
}}
                                        >
                                            Thêm vào giỏ hàng
                                        </Button>
                                    </Card>
                                ))}
                            </div>

                            {/* Load More Button */}
                            {filteredProducts.length > displayedProducts && (
                                <div className="mt-8 text-center">
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setDisplayedProducts(prev => Math.min(prev + 6, filteredProducts.length))}
                                    >
                                        Xem thêm sản phẩm
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}