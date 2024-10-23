'use client'

import HeroSection from "@components/RootLayout/HeroSlider";
import PaginatePage from "@components/RootLayout/Pagination";
import { Button } from "@components/ui/button";
// `app/page.js` is the UI for the `/` URL
export default function Home() {

  return (
    <>
      <div className="min-h-screen bg-background text-foreground grid grid-flow-row grid-rows-3">
        <HeroSection />
        {/* Categories */}
        <PaginatePage value={['Vòng tay', 'Dây chuyền', 'Nhẫn', 'Hoa tai']} tab='Danh mục sản phẩm' />
        {/* New Arrivals */}
        <PaginatePage value={['Vòng tay', 'Dây chuyền', 'Nhẫn', 'Hoa tai']} tab='Sản phẩm mới' />
        {/* Banner */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url('/placeholder.svg?height=400&width=1200')` }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-4xl font-bold mb-4">Bộ sưu tập mùa cưới</h2>
                  <p className="text-xl mb-8">Trang sức tinh tế cho ngày trọng đại</p>
                  <Button size="lg" variant="outline">
                    Khám phá ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <PaginatePage value={['Vòng tay', 'Dây chuyền', 'Nhẫn', 'Hoa tai']} tab='Sản phẩm bán chạy' />
      </div>
    </>
  );
}