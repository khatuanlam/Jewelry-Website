'use client'

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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TabsContent } from "@/components/ui/tabs"
import { addUser, editUser, toggleUserStatus } from '@app/actions'
import { users } from '@content'
import { useEffect, useState, useTransition } from 'react'
export default function UserTabs() {
    const tabs = ['Name', 'Email', 'Status', 'Actions']
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const [userList, setUserList] = useState([])
    const [newUser, setNewUser] = useState({ name: '', email: '' })
    const [isPending, startTransition] = useTransition()

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
            setUserList(updatedUsers)
            setNewUser({ name: '', email: '' })
        })
    }

    const handleEditUser = async (index, updatedUser) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index
        startTransition(async () => {
            const updatedUsers = await editUser(globalIndex, updatedUser)
            setUserList(updatedUsers)
        })
    }

    const handleLockUser = async (index) => {
        const globalIndex = (currentPage - 1) * itemsPerPage + index
        startTransition(async () => {
            const updatedUsers = await toggleUserStatus(globalIndex)
            setUserList(updatedUsers)
        })
    }

    return (
        <TabsContent value="users" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Quản lý người dùng</CardTitle>
                    <CardDescription>Add, edit, or lock user accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Tên người dùng</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter user's name"
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    placeholder="Enter user's email"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={isPending}>Add User</Button>
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
                                    <TableRow key={user.email}>
                                        <TableCell>{user.name || 'No value'}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.active ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => {
                                                    const newName = prompt('New name:', user.name)
                                                    if (newName) {
                                                        handleEditUser(index, { ...user, name: newName })
                                                    }
                                                }}
                                                disabled={isPending}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleLockUser(index)}
                                                disabled={isPending}
                                            >
                                                {user.isLock ? 'Unlock' : 'Lock'}
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
    )
}

