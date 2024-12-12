'use client'

import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@app/ui/AdminLayout/Header"
import OrdersTabs from '@app/ui/AdminLayout/Tabs/OrdersTabs'
import ProductsTabs from "@app/ui/AdminLayout/Tabs/ProductsTabs"
import StaticTabs from '@app/ui/AdminLayout/Tabs/StaticTabs'
import UserTabs from "@app/ui/AdminLayout/Tabs/UserTabs"

export default function AdminDashboard({ children }) {
    const [activeTab, setActiveTab] = useState('users')

    const handleTabChange = (value) => {
        setActiveTab(value)
    }



    return (
        <div className="flex w-screen h-screen overfzolow-hidden bg-gray-100">

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <AdminHeader />

                {/* Main content area */}
                <main className="flex-1 overflow-auto p-6">
                    <Tabs defaultValue="users" className="space-y-4" onValueChange={handleTabChange}>
                        <TabsList>
                            <TabsTrigger value="users">Người dùng</TabsTrigger>
                            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
                            <TabsTrigger value="orders">Đơn hàng </TabsTrigger>
                            <TabsTrigger value="static">Thống kê</TabsTrigger>
                        </TabsList>
                        {/* Users */}
                        <UserTabs value='users' />
                        {/* Products */}
                        <ProductsTabs value='products' />
                        {/* Orders */}
                        <OrdersTabs value='orders' />
                        {/* Statistic */}
                        <StaticTabs value='static' />
                    </Tabs>
                </main>
            </div>
        </div>
    )
}