'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, ShoppingBag, Edit, LogOut } from 'lucide-react';

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    address: '',
    gender: '',
    dob: ''
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserInfo({
        name: parsedUser.name || '',
        email: parsedUser.email || '',
        address: parsedUser.address || '',
        gender: parsedUser.gender || '',
        dob: parsedUser.dob || ''
      });
    } else {
      // If no user is logged in, redirect to login page
      router.push('/account?tab=login');
    }
  }, [router]);

  const updateUserInfo = (e) => {
    e.preventDefault();

    const updatedUser = { ...JSON.parse(localStorage.getItem('currentUser')), ...userInfo };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update the users array in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.email === updatedUser.email ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setIsEditModalOpen(false);
    alert('Thông tin tài khoản đã được cập nhật!');
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Đăng xuất thành công!");
    router.push("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
     <header className="bg-gradient-to-r from-gray-500 to-gray-100 h-64 flex flex-col justify-center shadow-lg">
  <h1 className="text-4xl font-semibold text-white ml-4 flex items-center">
    XIN CHÀO, {userInfo.name || 'KHÁCH'}
  </h1>
</header>


      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <User className="mr-2" /> Thông Tin Tài Khoản
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="flex items-center"><Label className="w-32">Tên:</Label> {userInfo.name || 'Not set'}</p>
                <p className="flex items-center"><Label className="w-32">Email:</Label> {userInfo.email || 'Not set'}</p>
                <p className="flex items-center"><Label className="w-32">Địa chỉ:</Label> {userInfo.address || 'Not set'}</p>
                <p className="flex items-center"><Label className="w-32">Giới tính:</Label> {userInfo.gender || 'Not set'}</p>
                <p className="flex items-center"><Label className="w-32">Ngày sinh:</Label> {userInfo.dob || 'Not set'}</p>
              </div>
              <div className="mt-6 space-x-2">
                <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" /> Sửa Thông Tin
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <ShoppingBag className="mr-2" /> Lịch Sử Mua Hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border p-2 bg-muted">Ngày</th>
                    <th className="border p-2 bg-muted">Sản phẩm</th>
                    <th className="border p-2 bg-muted">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add your purchase history logic here */}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </main>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center">
                <Edit className="mr-2" /> Sửa Thông Tin Tài Khoản
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={updateUserInfo} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên:</Label>
                  <Input
                    id="name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email:</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ:</Label>
                  <Input
                    id="address"
                    value={userInfo.address}
                    onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Giới tính:</Label>
                  <Select
                    value={userInfo.gender}
                    onValueChange={(value) => setUserInfo({ ...userInfo, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                      <SelectItem value="Khác">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh:</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={userInfo.dob}
                    onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit">
                    Lưu Thay Đổi
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

