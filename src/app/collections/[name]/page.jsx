'use client'

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
import { useState } from 'react'

const products = Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    price: `${(Math.random() * 2000000 + 500000).toFixed(0)}₫`,
    image: `/placeholder.svg?height=300&width=300`,
}))

const filters = [
    {
        name: 'Loại sản phẩm',
        options: ['Vòng tay', 'Dây chuyền', 'Nhẫn', 'Hoa tai'],
    },
    {
        name: 'Chất liệu',
        options: ['Bạc', 'Vàng', 'Vàng hồng', 'Thép không gỉ'],
    },
    {
        name: 'Giá',
        options: ['Dưới 1 triệu', '1 - 2 triệu', '2 - 5 triệu', 'Trên 5 triệu'],
    },
]

export default function CollectionPage() {
    const [activeFilters, setActiveFilters] = useState([])
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const toggleFilter = (filter) => {
        setActiveFilters(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header would go here (same as homepage) */}

            {/* Collection Banner */}
            <section className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url('/placeholder.svg?height=400&width=1200')` }}>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-4">Chào đón mùa lễ hội</h1>
                        <p className="text-xl">Khám phá bộ sưu tập trang sức lấp lánh cho mùa lễ hội</p>
                    </div>
                </div>
            </section>

            {/* Filters and Products */}
            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Filters - Desktop */}
                        <div className="w-full md:w-1/4 space-y-6 hidden md:block">
                            <h2 className="text-2xl font-bold">Bộ lọc</h2>
                            {filters.map((filter) => (
                                <div key={filter.name}>
                                    <h3 className="font-semibold mb-2">{filter.name}</h3>
                                    <div className="space-y-2">
                                        {filter.options.map((option) => (
                                            <div key={option} className="flex items-center">
                                                <Checkbox
                                                    id={option}
                                                    checked={activeFilters.includes(option)}
                                                    onCheckedChange={() => toggleFilter(option)}
                                                />
                                                <label htmlFor={option} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                                <p className="text-sm text-muted-foreground">Hiển thị {products.length} sản phẩm</p>
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
                                                        <h3 className="font-semibold mb-2">{filter.name}</h3>
                                                        <div className="space-y-2">
                                                            {filter.options.map((option) => (
                                                                <div key={option} className="flex items-center">
                                                                    <Checkbox
                                                                        id={`mobile-${option}`}
                                                                        checked={activeFilters.includes(option)}
                                                                        onCheckedChange={() => toggleFilter(option)}
                                                                    />
                                                                    <label htmlFor={`mobile-${option}`} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                                {products.map((product) => (
                                    <Card key={product.id}>
                                        <CardContent className="p-0">
                                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                                        </CardContent>
                                        <CardFooter className="flex flex-col items-start p-4">
                                            <h3 className="font-semibold">{product.name}</h3>
                                            <span className="mt-2 font-bold">{product.price}</span>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>

                            {/* Load More Button */}
                            <div className="mt-8 text-center">
                                <Button variant="outline">Xem thêm sản phẩm</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer would go here (same as homepage) */}
        </div>
    )
}