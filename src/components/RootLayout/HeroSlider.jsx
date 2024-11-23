
import { Button } from "@components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from 'react'

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides = [
        { image: '/assets/images/home/home1.webp?height=600&width=1200', title: 'Bộ sưu tập mùa hè', description: 'Khám phá những thiết kế mới nhất của chúng tôi' },
        { image: '/assets/images/home/home2.jpg?height=600&width=1200', title: 'Quà tặng hoàn hảo', description: 'Tìm món quà ý nghĩa cho người thân yêu' },
        { image: '/assets/images/home/home3.jpg?height=600&width=1200', title: 'Xu hướng 2024', description: 'Cập nhật phong cách với những mẫu trang sức mới nhất' },

    ]

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <>
            {/* Hero Slider */}
            <section className="relative">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide, index) => (
                            <div key={index} className="w-full flex-shrink-0">
                                <div className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${slide?.image})` }}>
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                            <p className="text-xl mb-8">{slide.description}</p>
                                            <Button size="lg">
                                                Khám phá ngay
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Button variant="outline" size="icon" className="absolute left-4 top-1/2 transform -translate-y-1/2" onClick={prevSlide}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={nextSlide}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </section>
        </>
    )
}