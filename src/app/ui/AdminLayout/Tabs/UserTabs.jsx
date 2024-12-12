'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
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
import { addUser, editingUser, toggleUserStatus } from '@app/actions'
import { users } from '@content'
import { Edit } from "lucide-react"
import { useEffect, useState, useTransition } from "react"
export default function UserTabs() {
    const tabs = ['Tên', 'Email', 'Trạng thái hoạt động']
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const [userList, setUserList] = useState([])
    const [newUser, setNewUser] = useState({ name: '', email: '' })
    const [isPending, startTransition] = useTransition()
    const [editUser, setEditUser] = useState({})
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    useEffect(() => {
        startTransition(async () => {
            console.log(users);
            setUserList(users)
        })
    }, [])

    const totalPages = Math.ceil(userList.length / itemsPerPage)

    const paginatedUsers = userList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage)
        }
    }

    const handleAddUser = async (e) => {
        e.preventDefault()
        startTransition(async () => {
            const updatedUsers = await addUser({ ...newUser, active: true })
            console.log(newUser);
            setUserList(updatedUsers)
            setNewUser({ name: '', email: '' })
        })
    }


    const handleEditClick = (index, user) => {
        setEditUser({ index, ...user })
        setIsEditModalOpen(true)
    }


    const handleEditUser = async (updatedUser) => {
        try {
            const globalIndex = (currentPage - 1) * itemsPerPage + updatedUser.index
            startTransition(async () => {
                const updatedUsers = await editingUser(globalIndex, updatedUser)
                setUserList(updatedUsers)
            })
        } finally {
            setIsEditModalOpen(false)
        }

    }

    const handleLockUser = async (index) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index
        startTransition(async () => {
            const updatedUsers = await toggleUserStatus(globalIndex)
            setUserList(updatedUsers)
        })
    }

    return (
        <>
            <TabsContent value="users" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-[2rem]'>Quản lý người dùng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Tên người dùng</Label>
                                    <Input
                                        id="name"
                                        placeholder="Nhập tên người dùng"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Nhập email người dùng"
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    />
                                </div>
                            </div>
                            <Button type="submit" disabled={isPending}>Thêm người dùng</Button>
                        </form>

                        <div className="mt-6">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {tabs.map((tab, index) => (
                                            <TableHead key={index}>{tab}</TableHead>
                                        ))}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedUsers.map((user, index) => (
                                        <TableRow key={user.name}>
                                            <TableCell>{user.name || 'Trống'}</TableCell>
                                            <TableCell>{user.email || 'Trống'}</TableCell>
                                            <TableCell>{user.active ? 'Đang hoạt động' : 'Offline'}</TableCell>
                                            <TableCell className='flex flex-shrink'>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="mr-2"
                                                    onClick={() => { handleEditClick(index, user) }}
                                                    disabled={isPending}
                                                >
                                                    Sửa
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleLockUser(index)}
                                                    disabled={isPending}
                                                >
                                                    {user.isLock ? 'Mở khóa' : 'Khóa'}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isPending}>
                                Previous
                            </Button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || isPending}>
                                Next
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
                            <Edit className="mr-2" /> Sửa Thông Tin Tài Khoản
                        </h2>
                        <div>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className=" mb-2 flex items-center text-black">
                                        Tên:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        value={editUser.name}
                                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 flex items-center text-black">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editUser.email}
                                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="gender" className="mb-2 flex items-center text-black">
                                        Giới tính:
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={editUser.gender}
                                        onChange={(e) => setEditUser({ ...editUser, gender: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    >
                                        <option value="male">Nam</option>
                                        <option value="female">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="birthdate" className=" mb-2 flex items-center text-black">
                                        Ngày sinh:
                                    </label>
                                    <input
                                        type="date"
                                        id="birthdate"
                                        name="dob"
                                        value={editUser.dob}
                                        onChange={(e) => setEditUser({ ...editUser, birthdate: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className=" mb-2 flex items-center text-black">
                                        Địa chỉ:
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={editUser.address}
                                        onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end text-black mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="mr-2 px-4 py-2 bg-gray-200 rounded"
                                >
                                    Hủy
                                </button>
                                <Button
                                    type="submit"
                                    onClick={() => handleEditUser(editUser)}
                                    className="px-4 py-2 bg-black text-white rounded flex items-center"
                                >
                                    Lưu Thay Đổi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

