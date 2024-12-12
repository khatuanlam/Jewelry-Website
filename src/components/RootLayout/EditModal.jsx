import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useEffect, useState } from "react"

export function EditProductModal({ product, isOpen, onClose, onSave }) {
    const [editedProduct, setEditedProduct] = useState(product || {})
    const [newImage, setNewImage] = useState(null)

    useEffect(() => {
        if (product) {
            setEditedProduct(product)
            setNewImage(null)
        }
    }, [product])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedProduct(prev => ({ ...prev, [name]: name === 'price' | 'quantity' ? parseFloat(value, 10) : value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setNewImage(URL.createObjectURL(file))
        }
    }

    const handleSave = () => {
        onSave({ ...editedProduct, image: newImage || editedProduct.images[0] })
    }

    if (!product) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-slate-100">
                <DialogHeader>
                    <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
                </DialogHeader>
                {product ? (
                    <>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-left">
                                    Tên sản phẩm
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={editedProduct.name}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-left">
                                    Giá thành
                                </Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type='number'
                                    value={editedProduct.price}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-left">
                                    Số lượng
                                </Label>
                                <Input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    value={parseInt(editedProduct.quantity) || 0}
                                    onChange={handleInputChange}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-left">
                                    Hình ảnh
                                </Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="col-span-3"
                                />
                            </div>
                            {(newImage || editedProduct.images[0]) && (
                                <div className="mt-2">
                                    <Image
                                        src={newImage || editedProduct.images[0]}
                                        alt={editedProduct.name}
                                        className="w-full max-h-48 object-cover rounded-md"
                                        height={300}
                                        width={300}
                                    />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleSave}>Lưu thay đổi</Button>
                        </DialogFooter>
                    </>
                ) : (
                    <p>No product selected for editing.</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

