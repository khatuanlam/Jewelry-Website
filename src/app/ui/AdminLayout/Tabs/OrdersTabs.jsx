'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { editOrder, filterOrders } from "@app/actions"
import { orders } from '@content'
import { provincesData } from "@data/page"
import { extractDate, formatCurrency } from "@utils/page"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OrdersTabs() {
    const [orderList, setOrderList] = useState([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [districtFilter, setDistrictFilter] = useState([])
    const [sortBy, setSortBy] = useState('date')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setOrderList(orders)
        const province = JSON.parse(provincesData)
        setDistrictFilter(province)
    }, [])

    const handleEditOrder = async (newStatus) => {
        setIsLoading(true)
        try {
            console.log('newStatus:'.newStatus);
            const updatedOrders = await editOrder(newStatus)
            setOrderList(updatedOrders)
        } finally {
            setIsLoading(false)
        }
    }

    const handleFilter = async () => {
        setIsLoading(true)
        try {
            const filteredOrders = await filterOrders(startDate, endDate, statusFilter === 'all' ? '' : statusFilter)
            setOrderList(filteredOrders)
        } finally {
            setIsLoading(false)
        }
    }


    const sortOrders = (orders) => {
        if (sortBy === 'district') {
            return [...orders].sort((a, b) => a.owner.address.district.localeCompare(b.owner.address.district))
        }
        return orders
    }

    const sortedOrders = sortOrders(orderList)

    return (
        <TabsContent value="orders" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className='text-[2rem]'>Quản lý đơn hàng</CardTitle>
                    <CardDescription> Tìm kiếm đơn hàng theo điều kiện </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 justify-start">
                            <div className="flex space-x-2 ">
                                <div className="space-y-2">
                                    <Label htmlFor="start-date">Ngày bắt đầu</Label>
                                    <Input
                                        type="date"
                                        id="start-date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-date">Ngày kết thúc</Label>
                                    <Input
                                        type="date"
                                        id="end-date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-date">Trạng thái đơn hàng</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Tất cả" value='all' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả</SelectItem>
                                        <SelectItem value="pending">Chưa xử lý</SelectItem>
                                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                                        <SelectItem value="shipped">Đã giao thành công</SelectItem>
                                        <SelectItem value="cancelled">Đã hủy đơn</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-date">Quận</Label>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Tất cả" value='Tất cả' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {districtFilter.map((district, index) => (
                                            <>
                                                <SelectItem value={district.Code}>{district.FullName}</SelectItem>
                                            </>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={handleFilter}>Tìm kiếm</Button>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Mã hóa đơn</TableHead>
                                    <TableHead>Tên khách hàng</TableHead>
                                    <TableHead>Ngày đặt hàng</TableHead>
                                    <TableHead>Tổng tiền</TableHead>
                                    <TableHead>Trạng thái</TableHead>
                                    <TableHead>Mã quận</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedOrders.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">
                                            Không tìm thấy dữ liệu
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    sortedOrders.map(order => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.id}</TableCell>
                                            <TableCell>{order.owner.name}</TableCell>
                                            <TableCell>{extractDate(order.createAt)}</TableCell>
                                            <TableCell>{formatCurrency(order.price)}</TableCell>
                                            <TableCell>
                                                <Select
                                                    value={order.status || 'Chưa xử lý'}
                                                    onValueChange={(newStatus) => handleEditOrder(order.id, newStatus)}
                                                    disabled={isLoading}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder='Chưa xử lý' />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="pending">Chưa xử lý</SelectItem>
                                                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                                                        <SelectItem value="shipped">Đã giao thành công</SelectItem>
                                                        <SelectItem value="cancelled">Đã hủy đơn</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                            <TableCell>{order.district}</TableCell>
                                            <TableCell>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/orders/${order.id}`}>Xem chi tiết</Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    )
}

