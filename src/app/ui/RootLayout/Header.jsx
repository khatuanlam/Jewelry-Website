'use client'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDown, LogIn, Menu, ShoppingBag, Signal, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState(null)
  // const { userLogin, updateCookie } = useContext(AuthContext);
  const [loginStatus, setLoginStatus] = useState(null);
  // Các đường dẫn có thể đến
  const routes = [
    {
      name: 'Sản phẩm',
      path: '/products',
      categories: ['Gold', 'Dây chuyền', 'Nhẫn', 'Hoa tai']
    },
    {
      name: 'Bộ sưu tập',
      path: '/collections',
      categories: ['Summer', 'Winter', 'Holiday', 'Birthday']
    },
    { name: 'Về chúng tôi', path: '/about' }
  ]

  return (
    <header className="border-b bg-pink-200">
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
                    <Button variant="ghost" className="text-sm font-medium hover:text-primary">
                      {route.name} <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {route.categories.map((subcategory, subIndex) => (
                      <DropdownMenuItem key={subIndex} onSelect={() => router.push(`${route.path}/${subcategory.toLowerCase().replace(' ', '-')}`)}>
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
                  className="text-sm font-medium hover:text-primary"
                >
                  {route.name}
                </Button>
              )
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Tìm kiếm sản phẩm" className="w-64 hidden md:block" />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <User className="h-5 w-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="end" forceMount>
                {/* <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-gray-500">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent> */}
                <DropdownMenuItem onClick={() => { router.push('/account') }}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { router.push('/account') }}>
                  <Signal className="mr-2 h-4 w-4" />
                  <span>Sign Up</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="sr-only">Tài khoản</span>
            <Button variant="ghost" size="icon" onClick={() => router.push('/cart')}>
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Giỏ hàng</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}