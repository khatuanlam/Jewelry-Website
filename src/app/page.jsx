'use client'

import HeroSection from "@components/RootLayout/HeroSlider";
import PaginatePage from "@components/RootLayout/Pagination";
import { Button } from "@components/ui/button";
import ThemeContext from "@contexts/ThemeContext";
import { useContext, useMemo } from "react";

export default function Home() {
  // Lấy các dữ liệu ban đầu
  const { product, setProducts } = useContext(ThemeContext)

  const bestSeller = useMemo(() => {
    return product.filter(item => {
      const rate = parseFloat(item.rating);
      return !isNaN(rate) && rate >= 3.5;
    });
  }, [product]);


  return (
    <>
      <div className="min-h-screen bg-background text-foreground grid grid-flow-row grid-rows-3">
        <HeroSection />
        {/* Categories */}
        <PaginatePage value={product} tab='Danh mục sản phẩm' />
        {/* New Arrivals */}
        <PaginatePage value={product} tab='Sản phẩm mới' />
        {/* Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[40vh] bg-cover bg-center">

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Bộ sưu tập mùa cưới</h2>
                  <p className="text-xl mb-8">Trang sức tinh tế cho ngày trọng đại</p>
                  <Button size="lg" variant="outline">
                    Khám phá ngay
                  </Button>
                </div>
                {/* <video
                  src="/assets/videos/vid.mp4"
                  className="relative h-[40vh] w-[100%] bg-cover bg-center"
                  autoPlay
                  loop
                  muted
                  playsInline
                /> */}
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <PaginatePage value={bestSeller} tab='Sản phẩm bán chạy' />
      </div>
    </>
  );
}
