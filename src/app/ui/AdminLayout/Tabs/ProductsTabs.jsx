'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
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
import { addProduct, deleteProduct, editProduct } from "@app/actions"
import { EditProductModal } from "@components/RootLayout/EditModal"
import { products } from '@content'
import { formatCurrency } from "@utils/page"
import Image from "next/image"
import { useEffect, useState } from "react"

const ITEMS_PER_PAGE = 5

export default function ProductsTabs() {
    const [currentPage, setCurrentPage] = useState(1)
    const [editingProduct, setEditingProduct] = useState({
        images: []
    })
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [productToDelete, setProductToDelete] = useState(null)
    const [productList, setProductList] = useState([])
    const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null })

    useEffect(() => {
        setProductList(products)
    }, [])

    const totalPages = Math.ceil(productList.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentProducts = productList.slice(startIndex, endIndex)

    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
        setIsEditModalOpen(true)
    }

    const handleSaveEdit = async (updatedProduct) => {
        if (updatedProduct) {
            const updatedProducts = await editProduct(updatedProduct)
            setProductList(updatedProducts)
        }
        setIsEditModalOpen(false)
    }

    const handleDeleteClick = (product) => {
        setProductToDelete(product)
        setIsDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (productToDelete) {
            const updatedProducts = await deleteProduct(productToDelete.id)
            setProductList(updatedProducts)
        }
        setIsDeleteDialogOpen(false)
    }

    const handleAddProduct = async () => {
        if (newProduct.name && newProduct.price) {
            const product = {
                name: newProduct.name,
                price: parseFloat(newProduct.price),
                images: newProduct.image ? [URL.createObjectURL(newProduct.image)] : ['/placeholder.png']
            }
            const updatedProducts = await addProduct(product)
            setProductList(updatedProducts)
            setNewProduct({ name: '', price: '', image: null })
        }
    }

    const handleNewProductChange = (e) => {
        const { name, value, files } = e.target
        if (name === 'image') {
            setNewProduct(prev => ({ ...prev, [name]: files[0] }))
        } else {
            setNewProduct(prev => ({ ...prev, [name]: value }))
        }
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
                                    <Label htmlFor="product-name">Tên sản phẩm</Label>
                                    <Input
                                        id="product-name"
                                        name="name"
                                        value={newProduct.name}
                                        onChange={handleNewProductChange}
                                        placeholder="Enter product name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="product-price">Giá thành</Label>
                                    <Input
                                        id="product-price"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleNewProductChange}
                                        placeholder="Enter price"
                                        type="number"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="product-price">Số lượng nhập</Label>
                                    <Input
                                        id="product-price"
                                        name="price"
                                        value={newProduct.price}
                                        onChange={handleNewProductChange}
                                        placeholder="Enter price"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="product-image">Hình ảnh</Label>
                                <Input
                                    id="product-image"
                                    name="image"
                                    onChange={handleNewProductChange}
                                    type="file"
                                    accept="image/*"
                                />
                            </div>
                            <Button onClick={handleAddProduct}>Add Product</Button>
                        </div>
                        <div className="mt-6 overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Hình ảnh </TableHead>
                                        <TableHead>Tên sản phẩm</TableHead>
                                        <TableHead>Giá thành</TableHead>
                                        <TableHead>Số lượng</TableHead>
                                        <TableHead className="text-right"></TableHead>
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
                                            <TableCell>{product.quantity}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(product)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(product)}>Delete</Button>
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
            <EditProductModal
                product={editingProduct}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
            />
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

