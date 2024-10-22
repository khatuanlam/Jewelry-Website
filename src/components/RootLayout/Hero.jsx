
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import products from '@content/products'
import Image from "next/image"

export default function HeroSection() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full" >
                <Carousel className="w-full max-w-5xl mx-auto container">
                    <CarouselContent>
                        {products.map((product) => (
                            <CarouselItem key={product.id} className="relative w-screen">
                                <Image
                                    priority={true}
                                    width={800}
                                    height={400}
                                    alt="Hero Section"
                                    quality={100}
                                    style={{ width: '100%', height: 'auto' }}
                                    src='/apple-touch-icon.png' />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>
        </>
    )
}