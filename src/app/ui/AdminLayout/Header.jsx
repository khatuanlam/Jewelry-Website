import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@components/ui/button"
import { BarChart, Bell, FileText, LayoutDashboard, LogOut, Menu, Package, Settings, Users } from "lucide-react"
import Link from "next/link"
export default function AdminHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 bg-white p-0">
                        <SheetHeader className="border-b p-4">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex-1 space-y-2 p-2">
                            <Link href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <LayoutDashboard className="mr-3 h-6 w-6" />
                                Dashboard
                            </Link>
                            <Link href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <Users className="mr-3 h-6 w-6" />
                                Users
                            </Link>
                            <Link href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <Package className="mr-3 h-6 w-6" />
                                Products
                            </Link>
                            <Link href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <FileText className="mr-3 h-6 w-6" />
                                Orders
                            </Link>
                            <Link href="#" className="flex items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100">
                                <BarChart className="mr-3 h-6 w-6" />
                                Statistics
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <h1 className="ml-4 text-lg font-semibold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center">
                <Button variant="ghost" size="icon" className="mr-4 text-gray-600 hover:text-gray-900">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
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
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

    )
}