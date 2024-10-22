import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import users from '@content/users.json';
import { useState } from 'react';

export default function UserTabs() {
    const tabs = ['Name', 'Email', 'Status', 'Actions']
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const itemsPerPage = 5; // Số người dùng mỗi trang
    const [userList, setUserList] = useState(users); // Danh sách người dùng

    const totalPages = Math.ceil(userList.length / itemsPerPage);

    // Xử lý phân trang
    const paginatedUsers = userList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Chuyển trang
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Chỉnh sửa người dùng
    const handleEditUser = (index, updatedUser) => {
        const updatedUserList = [...userList];
        updatedUserList[index] = updatedUser;
        setUserList(updatedUserList);
    };

    // Lock người dùng (đổi trạng thái active)
    const handleLockUser = (index) => {
        const updatedUserList = [...userList];
        updatedUserList[index].active = !updatedUserList[index].active;
        setUserList(updatedUserList);
    };

    return (
        <TabsContent value="users" className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Add, edit, or lock user accounts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter user's name" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" placeholder="Enter user's email" type="email" />
                            </div>
                        </div>
                        <Button>Add User</Button>
                    </div>

                    {/* Bảng danh sách người dùng */}
                    <div className="mt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {tabs.map((tab, index) => (
                                        <>
                                            <TableHead>{tab}</TableHead>
                                        </>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedUsers.map((user, index) => (
                                    <TableRow key={user.email}> {/* Sử dụng email hoặc id nếu có */}
                                        <TableCell>{user.name || 'No value'}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.active ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="mr-2"
                                                onClick={() => handleEditUser(index, { ...user, name: prompt('New name:', user.name) })}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleLockUser(index)}
                                            >
                                                {user.active ? 'Lock' : 'Unlock'}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </div>

                    {/* Phân trang */}
                    <div className="flex justify-between items-center mt-4">
                        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
