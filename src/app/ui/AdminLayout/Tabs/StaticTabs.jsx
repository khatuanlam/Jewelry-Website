import { TabsContent } from "@/components/ui/tabs";
import { Button } from '@components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@components/ui/dialog";
import { Input } from '@components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table';
import { orders } from '@content';
import { DollarSignIcon } from 'lucide-react';
import { useMemo, useState } from 'react';


export default function StaticTabs() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Lọc đơn hàng theo khoảng thời gian
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            if (!startDate && !endDate) return true;
            const orderDate = new Date(order.createAt.split(' ')[1].split('/').reverse().join('-'));
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            return (!start || orderDate >= start) && (!end || orderDate <= end);
        });
    }, [startDate, endDate]);

    // Thống kê mặt hàng
    const productAnalytics = useMemo(() => {
        const productStats = {};
        const productOrders = {};

        filteredOrders.forEach(order => {
            order.products.forEach(product => {
                if (!productStats[product.id]) {
                    productStats[product.id] = {
                        id: product.id,
                        name: product.name,
                        quantity: 0,
                        totalRevenue: 0,
                        totalQuantity: 0  // Add this
                    };
                    productOrders[product.id] = [];  // Initialize orders array
                }
                productStats[product.id].quantity += product.quantity;
                productStats[product.id].totalQuantity += product.quantity;  // Update total quantity
                productStats[product.id].totalRevenue += product.price * product.quantity;

                // Collect order details
                productOrders[product.id].push({
                    orderId: order.id,
                    customerName: order.name,
                    customerEmail: order.email,
                    quantity: product.quantity,
                    orderDate: order.createAt,
                    orderStatus: order.status
                });
            });
        });

        const sortedProducts = Object.values(productStats).map(product => ({
            ...product,
            orders: productOrders[product.id]
        })).sort((a, b) => b.quantity - a.quantity);

        return sortedProducts;
    }, [filteredOrders]);

    // Thống kê khách hàng
    const customerAnalytics = useMemo(() => {
        const customerStats = {};
        const customerOrders = {};

        filteredOrders.forEach(order => {
            if (!customerStats[order.email]) {
                customerStats[order.email] = {
                    name: order.name,
                    email: order.email,
                    totalSpent: 0,
                    orderCount: 0
                };
                customerOrders[order.email] = [];
            }

            customerStats[order.email].totalSpent += order.price;
            customerStats[order.email].orderCount += 1;

            // Collect order details
            customerOrders[order.email].push({
                orderId: order.id,
                orderDate: order.createAt,
                orderTotal: order.price,
                status: order.status,
                products: order.products.map(product => ({
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price
                }))
            });
        });

        const sortedCustomers = Object.values(customerStats)
            .map(customer => ({
                ...customer,
                orders: customerOrders[customer.email]
            }))
            .sort((a, b) => b.totalSpent - a.totalSpent)
            .slice(0, 5);

        return sortedCustomers;
    }, [filteredOrders]);

    // Tổng doanh thu
    const totalRevenue = useMemo(() => {
        return filteredOrders.reduce((total, order) => total + order.price, 0);
    }, [filteredOrders]);


    // Component hiển thị chi tiết sản phẩm
    const ProductDetailModal = () => {
        if (!selectedProduct) return null;

        return (
            <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
                <DialogContent className="sm:max-w-[800px] bg-slate-50">
                    <DialogHeader>
                        <DialogTitle>Chi Tiết Sản Phẩm: {selectedProduct.name}</DialogTitle>
                        <DialogDescription>
                            Thông tin chi tiết và đơn hàng của sản phẩm
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông Tin Sản Phẩm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-1 gap-4">
                                    <div>
                                        <p className="w-full"><strong>Tên Sản Phẩm:</strong> {selectedProduct.name}</p>
                                        <p><strong>Tổng Số Lượng Bán:</strong> {selectedProduct.totalQuantity}</p>
                                        <p><strong>Tổng Doanh Thu:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedProduct.totalRevenue)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Đơn Hàng Của Sản Phẩm</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Mã Đơn</TableHead>
                                            <TableHead>Tên Khách Hàng</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Số Lượng</TableHead>
                                            <TableHead>Ngày Đặt</TableHead>
                                            <TableHead>Trạng Thái</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedProduct.orders.map((order, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.customerName}</TableCell>
                                                <TableCell>{order.customerEmail}</TableCell>
                                                <TableCell>{order.quantity}</TableCell>
                                                <TableCell>{order.orderDate}</TableCell>
                                                <TableCell>
                                                    <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${order.orderStatus === 'confirmed' ? 'bg-green-200 text-green-800' :
                                                            order.orderStatus === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                                                'bg-red-200 text-red-800'}
                          `}>
                                                        {order.orderStatus}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

    // Component hiển thị chi tiết khách hàng
    const CustomerDetailModal = () => {
        if (!selectedCustomer) return null;

        return (
            <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
                <DialogContent className="sm:max-w-[800px] bg-slate-50">
                    <DialogHeader>
                        <DialogTitle>Chi Tiết Khách Hàng: {selectedCustomer.name}</DialogTitle>
                        <DialogDescription>
                            Thông tin chi tiết và đơn hàng của khách hàng
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông Tin Khách Hàng</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p><strong>Tên:</strong> {selectedCustomer.name}</p>
                                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                                        <p><strong>Tổng Chi Tiêu:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedCustomer.totalSpent)}</p>
                                        <p><strong>Tổng Số Đơn:</strong> {selectedCustomer.orderCount}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Danh Sách Đơn Hàng</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Mã Đơn</TableHead>
                                            <TableHead>Ngày Đặt</TableHead>
                                            <TableHead>Tổng Tiền</TableHead>
                                            <TableHead>Trạng Thái</TableHead>
                                            <TableHead>Chi Tiết Sản Phẩm</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {selectedCustomer.orders.map((order, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.orderDate}</TableCell>
                                                <TableCell>
                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.orderTotal)}
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`
                            px-2 py-1 rounded-full text-xs
                            ${order.status === 'confirmed' ? 'bg-green-200 text-green-800' :
                                                            order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                                                'bg-red-200 text-red-800'}
                          `}>
                                                        {order.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm">Xem SP</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className='bg-slate-50'>
                                                            <DialogHeader>
                                                                <DialogTitle>Sản Phẩm Trong Đơn</DialogTitle>
                                                            </DialogHeader>
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow>
                                                                        <TableHead>Tên Sản Phẩm</TableHead>
                                                                        <TableHead>Số Lượng</TableHead>
                                                                        <TableHead>Đơn Giá</TableHead>
                                                                        <TableHead>Tổng</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {order.products.map((product, idx) => (
                                                                        <TableRow key={idx}>
                                                                            <TableCell>{product.name}</TableCell>
                                                                            <TableCell>{product.quantity}</TableCell>
                                                                            <TableCell>
                                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                                            </TableCell>
                                                                            <TableCell>
                                                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price * product.quantity)}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </DialogContent>
                                                    </Dialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };
    return (

        <TabsContent value='static' className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className='text-[2rem]'>Quản lý thống kê kinh doanh</CardTitle>
                    <CardDescription>Phân tích doanh thu và khách hàng</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-4 mb-4">
                        <div className="space-y-2">
                            <label>Ngày bắt đầu</label>
                            <Input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label>Ngày kết thúc</label>
                            <Input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tổng quan */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Tổng Doanh Thu</CardTitle>
                                <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenue)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Thống kê Mặt Hàng */}
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Thống Kê Mặt Hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên Sản Phẩm</TableHead>
                                        <TableHead>Số Lượng Bán</TableHead>
                                        <TableHead>Tổng Doanh Thu</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {productAnalytics.map(product => (
                                        <TableRow key={product.name}>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.totalRevenue)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSelectedProduct(product == undefined ? [] : product)}
                                                >
                                                    Xem Chi Tiết
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Thống kê Khách Hàng */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Top 5 Khách Hàng</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tên Khách Hàng</TableHead>
                                        <TableHead>Tổng Chi Tiêu</TableHead>
                                        <TableHead>Số Đơn Hàng</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customerAnalytics.map(customer => (
                                        <TableRow key={customer.email}>
                                            <TableCell>{customer.name}</TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(customer.totalSpent)}
                                            </TableCell>
                                            <TableCell>{customer.orderCount}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSelectedCustomer(customer)}
                                                >
                                                    Xem Đơn Hàng
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
            <ProductDetailModal />
            <CustomerDetailModal />
        </TabsContent>
    );
}