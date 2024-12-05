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
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import Image from "next/image"
import { useState } from "react"

import { products } from "@content"
import { formatCurrency } from "@utils/page"
// import { EditProductModal } from "./edit-product-modal"

const ITEMS_PER_PAGE = 5

export default function ProductsTabs() {
    const [currentPage, setCurrentPage] = useState(1)
    const [editingProduct, setEditingProduct] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentProducts = products.slice(startIndex, endIndex)

    const handleEditClick = (product) => {
        setEditingProduct(product)
        setIsEditModalOpen(true)
    }

    const handleSaveEdit = (updatedProduct) => {
        // Here you would typically update the product in your backend
        console.log('Saving updated product:', updatedProduct)
        // For this example, we're just closing the modal
        setIsEditModalOpen(false)
    }

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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="mt-6 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentProducts.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <Image
                                                    src={product.images ? product.images[0] : '/placeholder.png'}
                                                    width={50}
                                                    height={50}
                                                    alt={product.name}
                                                    className="object-cover"
                                                />
                                            </TableCell>
                                            <TableCell className="font-medium">{product.name}</TableCell>
                                            <TableCell>{formatCurrency(product.price)} đ</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(product)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm">Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() => setCurrentPage(i + 1)}
                                                isActive={currentPage === i + 1}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            {/* <EditProductModal
                product={editingProduct}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
            /> */}
        </>
    )
}

