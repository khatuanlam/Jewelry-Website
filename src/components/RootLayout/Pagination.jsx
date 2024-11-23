import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import ThemeContext from "@contexts/ThemeContext";
import { formatCurrency } from "@utils/page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext, useMemo, useRef, useState } from "react";

export default function PaginatePage({ value, tab }) {
    const slider = useRef(null);
    const [filter, setFilter] = useState('all')
    const { router } = useContext(ThemeContext)
    const scroll = (direction) => {
        if (slider.current) {
            const { scrollLeft, clientWidth } = slider.current
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
            slider.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }
    const category = useMemo(() => {
        if (filter === 'all') {
            return value
        } else {
            return value.filter(item => item.category === filter);
        }
    }, [filter, value])

    return (
        <>
            <section className="py-12 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">{tab}</h2>
                    <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="Vòng tay tình yêu và tình bạn">Tình yêu</TabsTrigger>
                            <TabsTrigger value="Vòng tay tự chọn charm">Vòng tay</TabsTrigger>
                            <TabsTrigger value="Vòng tay sang trọng">Sang trọng</TabsTrigger>
                            <TabsTrigger value="Charm">Khuyên tai</TabsTrigger>
                        </TabsList>
                        <TabsContent value={filter}>
                            <div className="relative">
                                <div
                                    ref={slider}
                                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {category.map((item, i) => (
                                        <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-start px-2" onClick={() => router.push(`/products/${item.id}`)}>
                                            <Card className='min-h-full hover: cursor-pointer group relative overflow-hidden'>
                                                <CardContent className='p-0'>
                                                    <div className="relative aspect-square">
                                                        <Image
                                                            src={item.images?.[0] || item.images?.[1]}
                                                            alt={`Sản phẩm ${item.name}`}
                                                            className="w-full h-full object-cover"
                                                            height={300}
                                                            width={300}
                                                        />
                                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <span className="text-white font-semibold">Xem chi tiết</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex flex-col items-start p-4">
                                                    <h3 className="font-semibold">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground">Hãng: {item.brand}</p>
                                                    <span className="mt-2 font-bold">{formatCurrency(item.price)}₫</span>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-background"
                                    onClick={() => scroll('left')}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Scroll left</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-background"
                                    onClick={() => scroll('right')}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span className="sr-only">Scroll right</span>
                                </Button>
                            </div>
                        </TabsContent>
                        {/* Các TabsContent khác tương tự */}
                    </Tabs>
                </div>
            </section>
        </>

    )
}