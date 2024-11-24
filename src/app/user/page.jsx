'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { User, ShoppingBag, Edit } from 'lucide-react';

export default function AccountPage() {
    const [userInfo, setUserInfo] = useState({
      name: '',
      email: '',
      phone: '',
      gender: '',
      birthdate: ''
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    useEffect(() => {
      const storedUserInfo = {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        gender: localStorage.getItem('userGender') || '',
        birthdate: localStorage.getItem('userBirthdate') || ''
      };
      setUserInfo(storedUserInfo);
    }, []);
  
    const updateUserInfo = (e) => {
      e.preventDefault();
  
      // Save user info to localStorage
      Object.entries(userInfo).forEach(([key, value]) => {
        localStorage.setItem(`user${key.charAt(0).toUpperCase() + key.slice(1)}`, value);
      });
      setIsEditModalOpen(false);
      alert('Thông tin tài khoản đã được cập nhật!');
    };
  
    return (
      <div className="bg-white min-h-screen">
<header className="bg-gradient-to-r from-gray-400 to-gray-100 h-64 flex flex-col justify-center shadow-lg" style={{ height: '300px' }}>
<h1 className="text-4xl font-semibold text-white ml-4 flex items-center">
            XIN CHÀO, {userInfo.name || 'KHÁCH'}
          </h1>
        </header>
  
        <main className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6  shadow border border-gray-500">
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
                <User className="mr-2" /> Thông Tin Tài Khoản
              </h2>
              <div className="space-y-4">
                <p className="flex items-center text-black"><strong className="w-32">Tên:</strong> {userInfo.name || 'Not set'}</p>
                <p className="flex items-center text-black"><strong className="w-32">Email:</strong> {userInfo.email || 'Not set'}</p>
                <p className="flex items-center text-black"><strong className="w-32">Số điện thoại:</strong> {userInfo.phone || 'Not set'}</p>
                <p className="flex items-center text-black"><strong className="w-32">Giới tính:</strong> {userInfo.gender || 'Not set'}</p>
                <p className="flex items-center text-black"><strong className="w-32">Ngày sinh:</strong> {userInfo.birthdate || 'Not set'}</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-blue-600 underline cursor-pointer mt-6 flex items-center"
              >
                <Edit className="mr-2" /> Sửa Thông Tin
              </button>
            </div>
  
            <div className="bg-white p-6  shadow border  border-gray-500">
              <h2 className="text-2xl font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center text-black">
                <ShoppingBag className="mr-2" /> Lịch Sử Mua Hàng
              </h2>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border p-2 bg-gray-100 text-black">Ngày</th>
                    <th className="border p-2 bg-gray-100 text-black">Sản phẩm</th>
                    <th className="border p-2 bg-gray-100 text-black">Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Add your purchase history logic here */}
                </tbody>
              </table>
            </div>
          </div>
        </main>
  
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-black">
                <Edit className="mr-2" /> Sửa Thông Tin Tài Khoản
              </h2>
              <form onSubmit={updateUserInfo}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 flex items-center text-black">
                      Tên:
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userInfo.name}
                      onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 flex items-center text-black">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-2 flex items-center text-black">
                      Số điện thoại:
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="block mb-2 flex items-center text-black">
                      Giới tính:
                    </label>
                    <select
                      id="gender"
                      value={userInfo.gender}
                      onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}
                      className="w-full p-2 border rounded"
                      required
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="birthdate" className="block mb-2 flex items-center text-black">
                      Ngày sinh:
                    </label>
                    <input
                      type="date"
                      id="birthdate"
                      value={userInfo.birthdate}
                      onChange={(e) => setUserInfo({...userInfo, birthdate: e.target.value})}
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
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
                  >
                    Lưu Thay Đổi
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

