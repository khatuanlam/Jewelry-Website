'use client'
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Heart, MapPin, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function Header() {
  const router = useRouter();
  // Kiểm tra người dùng 
  return (
    <>
      <header className="font-sans bg-pink-200 w-screen">
        {/* Promotional banner */}
        <div className="bg-pink-100 text-pink-800 py-2 px-4 flex justify-between items-center">
          <span className="text-sm font-medium">
            [ONLINE] MUA 1 VÒNG + 1 CHARM = GIẢM 20%
          </span>
          <Button variant="link" className="text-pink-800 font-bold">
            MUA NGAY
          </Button>
          <Button variant="ghost" size="icon" className="text-pink-800">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Main header */}
        <div className="container p-4 m-auto ">
          <div className="flex justify-between items-center content-center">
            {/* Logo */}
            <div className="flex-shrink-0" style={{ width: 'auto', height: 'auto' }}>
              <Image
                priority={true}
                src="/logo.png"
                width={500}
                height={500}
                alt="Logo"
                quality={100}
                style={{ width: '100%', height: 'auto' }} // Để hình ảnh co giãn
              />
            </div>


            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Search bar */}
              <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Bạn cần tìm gì?"
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 outline-lime-50" />
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MapPin className="h-5 w-5" />
              </Button>
              <Button onClick={() => { router.push('/account/login') }} variant="ghost" size="icon">
                <User size={24} />
              </Button>
              <Button onClick={() => { router.push('/cart') }} variant="ghost" size="icon">
                <ShoppingCart size={24} />
              </Button>
            </div>
          </div>

          {/* Navigation menu
          <NavigationMenu className="mt-4">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-pink-600 text-white hover:bg-pink-700">
                  ƯU ĐÃI ĐẾN 4.5 TRIỆU
                </NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-700 hover:text-pink-600">
                  QUÀ TẶNG NGƯỜI THƯƠNG
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-700 hover:text-pink-600">
                  QUÀ TẶNG MẸ YÊU
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-gray-700 hover:text-pink-600">
                  BỘ QUÀ TẶNG PHỐI SẴN
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-pink-600">
                  TRANG SỨC CHỦ PHÁI ĐẸP
                </NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-pink-600">
                  GỢI Ý QUÀ TẶNG 20/10
                </NavigationMenuTrigger>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-pink-600">
                  COLLECTIONS
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu> */}
        </div>
      </header>
    </>
  )
}