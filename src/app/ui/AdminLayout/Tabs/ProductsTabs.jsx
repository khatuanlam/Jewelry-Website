import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"


export default function ProductsTabs() {
    return (
        <>
            <TabsContent value="products" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Management</CardTitle>
                        <CardDescription>Add, edit, or remove products.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product-name">Product Name</Label>
                                    <Input id="product-name" placeholder="Enter product name" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-price">Price</Label>
                                    <Input id="product-price" placeholder="Enter price" type="number" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-image">Product Image</Label>
                                <Input id="product-image" type="file" accept="image/*" />
                            </div>
                            <Button>Add Product</Button>
                        </div>
                        <div className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Image src="/placeholder.svg" width={50} height={50} alt="Product" />
                                        </TableCell>
                                        <TableCell>Product A</TableCell>
                                        <TableCell>$99.99</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                                            <Button variant="destructive" size="sm">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                    {/* Add more rows as needed */}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </>
    )
}