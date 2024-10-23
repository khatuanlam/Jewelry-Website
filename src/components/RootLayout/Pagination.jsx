import { Button } from "@components/ui/button";
import { Card, CardContent, CardFooter } from "@components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { ChevronLeft, ChevronRight, Image } from "lucide-react";
import { useRef } from "react";

export default function PaginatePage({ value, tab }) {
    const slider = useRef(null);

    const scroll = (direction) => {
        if (slider.current) {
            const { scrollLeft, clientWidth } = slider.current
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
            slider.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }
    return (
        <>
            <section className="py-12 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-8 text-center">{tab}</h2>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-8">
                            <TabsTrigger value="all">Tất cả</TabsTrigger>
                            <TabsTrigger value="bracelets">Vòng tay</TabsTrigger>
                            <TabsTrigger value="necklaces">Dây chuyền</TabsTrigger>
                            <TabsTrigger value="rings">Nhẫn</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all">
                            <div className="relative">
                                <div
                                    ref={slider}
                                    className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {value.map((item) => (
                                        <div key={item} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 snap-start px-2">
                                            <Card>
                                                <CardContent className="p-0">
                                                    <div className="relative aspect-square">
                                                        <Image
                                                            src={`/placeholder.svg?height=300&width=300`}
                                                            alt={`Sản phẩm ${item}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex flex-col items-start p-4">
                                                    <h3 className="font-semibold">Vòng tay pha lê</h3>
                                                    <p className="text-sm text-muted-foreground">Mã: SP00{item}</p>
                                                    <span className="mt-2 font-bold">1.200.000₫</span>
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