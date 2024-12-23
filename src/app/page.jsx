'use client'

import HeroSection from "@components/RootLayout/HeroSlider";
import PaginatePage from "@components/RootLayout/Pagination";
import LoadingScreen from "@components/RootLayout/Skeleton";
import { Button } from "@components/ui/button";
import { products } from '@content';
import AuthContext from "@contexts/auth/AuthContext";
import { useContext, useEffect, useMemo, useState } from "react";
import AdminDashboard from "./admin/page";

export default function Home() {
  const { admin, isLoggedIn } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true);

  const bestSeller = useMemo(() => {
    return products.filter(item => {
      const rate = parseFloat(item.rating);
      return !isNaN(rate) && rate >= 3.5;
    });
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isLoggedIn && admin) {
    return <AdminDashboard />
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground grid grid-flow-row grid-rows-3">
        <HeroSection />
        <PaginatePage value={products} tab={<span className="text-black">Danh mục sản phẩm</span>} />
        <PaginatePage value={products} tab={<span className="text-black">Sản phẩm mới</span>} />

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[300px] w-full bg-cover bg-center" style={{ backgroundImage: `url('/assets/images/collectionngaycuoi.jpg')` }}>

              <div className="absolute inset-0 bg-white  bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-black">
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
        <PaginatePage value={bestSeller} tab={<span className="text-black">Sản phẩm bán chạy</span>} />
      </div >
    </>
  )
}
