'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@components/ui/alert"
import AuthContext from "@contexts/auth/AuthContext"
import ThemeContext from "@contexts/ThemeContext"
import { ChevronDown, LogIn, LogOut, Menu, Search, ShoppingBag, Signal, User } from "lucide-react"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"

export default function Header() {
  const { router } = useContext(ThemeContext)
  const [openDropdown, setOpenDropdown] = useState(null)
  // Lấy các thông tin về tài khoản đăng nhập
  const { logout, isLoggedIn } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false)
  const { admin } = useContext(AuthContext)

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [showAlert])

  const routes = [
    {
      name: 'Sản phẩm',
      path: '/collections',
      categories: ['Vòng tay ', 'Charm']
    },
    {
      name: 'Bộ sưu tập',
      path: '/collections',
      categories: ['Bộ sưu tập mới', 'Sang trọng', 'Vintage', 'Tình yêu và tình bạn']
    },
    { name: 'Về chúng tôi', path: '/about' }
  ]

  const handleCart = () => {
    if (isLoggedIn) {
      router.push('/cart')
    } else {
      setShowAlert(true)
    }
  }

  return (
    admin == false && (
      <>
        <div className="h-2" style={{ backgroundColor: 'rgb(255, 202, 212)', height: '40px', position: 'sticky', top: '0', zIndex: 10 }
        }></div>
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
                    {isLoggedIn == false ? (
                      <>
                        <DropdownMenuItem onClick={() => { router.push('/account') }} className="text-black">
                          <LogIn className="mr-2 h-4 w-4 text-black" />
                          <span>Đăng nhập</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { router.push('/account') }} className="text-black">
                          <Signal className="mr-2 h-4 w-4 text-black" />
                          <span>Đăng ký</span>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => { router.push('/account') }} className="text-black">
                          <User className="mr-2 h-4 w-4 text-black" />
                          <span>Thông tin cá nhân</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { logout() }} className="text-black">
                          <LogOut className="mr-2 h-4 w-4 text-black" />
                          <span>Đăng xuất</span>
                        </DropdownMenuItem>
                      </>
                    )}

                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="sr-only">Tài khoản</span>
                <Button variant="ghost" size="icon" onClick={handleCart} className="text-black relative">
                  <ShoppingBag className="h-5 w-5 text-black " />
                  <span className="sr-only">Giỏ hàng</span>
                  {showAlert && (
                    <div className="absolute top-full right-0 mt-2 w-64">
                      <Alert variant="destructive">
                        <AlertDescription>
                          Vui lòng đăng nhập để xem giỏ hàng.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
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
  )
}
