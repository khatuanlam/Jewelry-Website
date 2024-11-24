'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDown, LogIn, Menu, ShoppingBag, Signal, User, Search } from "lucide-react" 
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(null)
  const [loginStatus, setLoginStatus] = useState(null);

  const routes = [
    {
      name: 'Trang chủ',
      path:'/'
    },
    {
      name: 'Sản phẩm',
      path: '/products',
      categories: ['Vòng tay ',  'Charm']
    },
    {
      name: 'Bộ sưu tập',
      path: '/collections',
      categories: ['Bộ sưu tập mới', 'Sang trọng', 'Vintage', 'Tình yêu và tình bạn']
    },
    { name: 'Về chúng tôi', path: '/about' }
  ]

  return (
    <>
      <div className="h-2" style={{ backgroundColor: 'rgb(255, 202, 212)', height: '40px', position: 'sticky', top: '0', zIndex: 10 }}></div>

      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center hover: cursor-pointer">
              <Image width={180} height={500} alt="Logo" priority={true} src={'/logo.png'} onClick={() => { router.push('/') }} />
            </div>
            <nav className="hidden md:flex space-x-4">
              {routes.map((route, index) => (
                route.categories ? (
                  <DropdownMenu key={index} open={openDropdown === route.name} onOpenChange={() => setOpenDropdown(openDropdown === route.name ? null : route.name)}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-sm font-medium hover:text-primary text-black">
                        {route.name} <ChevronDown className="ml-1 h-4 w-4 text-black" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {route.categories.map((subcategory, subIndex) => (
                        <DropdownMenuItem key={subIndex} onSelect={() => router.push(`${route.path}/${subcategory.toLowerCase().replace(' ', '-')}`)} className="text-black">
                          {subcategory}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => router.push(route.path)}
                    className="text-sm font-medium hover:text-primary text-black"
                  >
                    {route.name}
                  </Button>
                )
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Tìm kiếm sản phẩm"
                  className="w-64 hidden md:block text-black rounded-full pl-10" 
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <User className="h-5 w-5 text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="end" forceMount>
                  <DropdownMenuItem onClick={() => { router.push('/account') }} className="text-black">
                    <LogIn className="mr-2 h-4 w-4 text-black" />
                    <span>Login</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { router.push('/account') }} className="text-black">
                    <Signal className="mr-2 h-4 w-4 text-black" />
                    <span>Sign Up</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="sr-only">Tài khoản</span>
              <Button variant="ghost" size="icon" onClick={() => router.push('/cart')} className="text-black">
                <ShoppingBag className="h-5 w-5 text-black" />
                <span className="sr-only">Giỏ hàng</span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden text-black">
                <Menu className="h-5 w-5 text-black" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-2" style={{ backgroundColor: 'rgb(255, 202, 212)', height: '10px' }}></div>
      </header>
    </>
  )
}
