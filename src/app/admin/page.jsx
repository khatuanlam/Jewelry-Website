'use client'

import { useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@app/ui/AdminLayout/Header"
import OrdersTabs from '@app/ui/AdminLayout/Tabs/OrdersTabs'
import ProductsTabs from "@app/ui/AdminLayout/Tabs/ProductsTabs"
import UserTabs from "@app/ui/AdminLayout/Tabs/UserTabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card'
import { Input } from '@components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { Label } from '@radix-ui/react-label'
import { Package } from 'lucide-react'

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
                            <TabsTrigger value="users">Users</TabsTrigger>
                            <TabsTrigger value="products">Products</TabsTrigger>
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="statistics">Statistics</TabsTrigger>
                        </TabsList>
                        {/* Users */}
                        <UserTabs />
                        {/* Products */}
                        <ProductsTabs />

                        <OrdersTabs />

                        <TabsContent value="statistics" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Business Statistics</CardTitle>
                                    <CardDescription>View sales and customer statistics.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex space-x-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="start-date">Start Date</Label>
                                                <Input type="date" id="start-date" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="end-date">End Date</Label>
                                                <Input type="date" id="end-date" />
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="h-4 w-4 text-muted-foreground"
                                                    >
                                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                    </svg>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">$45,231.89</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        +20.1% from last month
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="h-4 w-4 text-muted-foreground"
                                                    >
                                                        <rect width="20" height="14" x="2" y="5" rx="2" />
                                                        <path d="M2 10h20" />
                                                    </svg>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">+12,234</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        +19% from last month
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        className="h-4 w-4 text-muted-foreground"
                                                    >
                                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                        <circle cx="9" cy="7" r="4" />
                                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                                    </svg>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">+573</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        +201 since last week
                                                    </p>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                    <CardTitle className="text-sm font-medium">Best Selling Product</CardTitle>
                                                    <Package className="h-4 w-4 text-muted-foreground" />
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="text-2xl font-bold">Product A</div>
                                                    <p className="text-xs text-muted-foreground">
                                                        1,234 units sold
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Top 5 Customers</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Customer</TableHead>
                                                            <TableHead>Total Spent</TableHead>
                                                            <TableHead>Orders</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>John Doe</TableCell>
                                                            <TableCell>$5,230.50</TableCell>
                                                            <TableCell>23</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    )
}