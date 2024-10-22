import { BarChart, FileText, LayoutDashboard, Package, Users } from "lucide-react"
import Link from "next/link"

export default function Sidebar() {
    return (
        <aside className="hidden w-64 overflow-y-auto bg-white md:block" >
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-center">
                    <span className="text-2xl font-semibold text-gray-800">Admin Panel</span>
                </div>
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
            </div>
        </aside>
    )
}