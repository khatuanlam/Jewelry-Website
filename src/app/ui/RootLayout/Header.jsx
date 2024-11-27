'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { LogIn, LogOut, Menu, ShoppingBag, User, Search, ChevronDown } from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkLoginStatus = () => {
        const user = localStorage.getItem("currentUser");
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser(JSON.parse(user));
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      };

      checkLoginStatus();
      window.addEventListener('storage', checkLoginStatus);
      window.addEventListener('userLogin', checkLoginStatus);

      return () => {
        window.removeEventListener('storage', checkLoginStatus);
        window.removeEventListener('userLogin', checkLoginStatus);
      };
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    alert("Đăng xuất thành công!");
    router.push("/");
  };

  const routes = [
    { name: "Trang chủ", path: "/" },
    {
      name: "Sản phẩm",
      path: "/products",
      categories: ["Vòng tay", "Charm"]
    },
    {
      name: "Bộ sưu tập",
      path: "/collections",
      categories: ["Bộ sưu tập mới", "Sang trọng", "Vintage", "Tình yêu và tình bạn"]
    },
    { name: "Về chúng tôi", path: "/about" }
  ];

  return (
    <>
      <div className="h-2" style={{ backgroundColor: "rgb(255, 202, 212)", height: "40px", position: "sticky", top: "0", zIndex: 10 }}></div>

      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center hover:cursor-pointer">
              <Image
                width={180}
                height={500}
                alt="Logo"
                priority={true}
                src={"/logo.png"}
                onClick={() => router.push("/")}
              />
            </div>
            <nav className="hidden md:flex space-x-4">
              {routes.map((route, index) =>
                route.categories ? (
                  <DropdownMenu
                    key={index}
                    open={openDropdown === route.name}
                    onOpenChange={() =>
                      setOpenDropdown(openDropdown === route.name ? null : route.name)
                    }
                  >
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="text-sm font-medium hover:text-primary text-black">
                        {route.name} <ChevronDown className="ml-1 h-4 w-4 text-black" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {route.categories.map((subcategory, subIndex) => (
                        <DropdownMenuItem
                          key={subIndex}
                          onSelect={() =>
                            router.push(
                              `${route.path}/${subcategory.toLowerCase().replace(" ", "-")}`
                            )
                          }
                          className="text-black"
                        >
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
              )}
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

              <Button variant="ghost" size="icon" onClick={() => router.push("/cart")} className="text-black">
                <ShoppingBag className="h-5 w-5 text-black" />
                <span className="sr-only">Giỏ hàng</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-black">
                    <User className="h-5 w-5 text-black" />
                    <span className="sr-only">Tài khoản</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {isLoggedIn ? (
                    <>
                      <DropdownMenuItem onSelect={() => router.push("/user")}>
                        Xem thông tin tài khoản
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Đăng xuất</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onSelect={() => router.push("/account?tab=login")}>
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Đăng nhập</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => router.push("/account?tab=register")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Đăng ký</span>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="icon" className="md:hidden text-black">
                <Menu className="h-5 w-5 text-black" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="h-2" style={{ backgroundColor: "rgb(255, 202, 212)", height: "10px" }}></div>
      </header>
    </>
  );
}
