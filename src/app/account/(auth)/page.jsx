'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthForms() {
    const [tab, setTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [users, setUsers] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }

        const tabParam = searchParams.get('tab');
        if (tabParam === 'login' || tabParam === 'register') {
            setTab(tabParam);
        }
    }, [searchParams]);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const newUser = Object.fromEntries(formData.entries());

        if (newUser.password !== newUser.confirmPassword) {
            alert("Mật khẩu và xác nhận mật khẩu không khớp!");
            return;
        }

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        alert("Đăng ký thành công! Chuyển đến trang đăng nhập.");
        setTab("login");
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData.entries());

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.dispatchEvent(new Event('userLogin'));
            alert("Đăng nhập thành công! Chuyển đến trang chủ.");
            router.push("/");
        } else {
            alert("Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
            <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-1/2 relative hidden md:block">
                    <Image
                        src="/assets/images/login.jpeg"
                        alt="Xác thực tài khoản"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <Card className="w-full md:w-1/2 border-none shadow-none">
                    <CardHeader>
                        <CardTitle className='text-center font-serif text-[3rem]'>Charisma</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                                <TabsTrigger value="register">Đăng ký</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                            <form onSubmit={handleLogin}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_email">Email</Label>
                                            <Input id="login_email" name="email" placeholder="Nhập email của bạn" type="email" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_password">Mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="login_password"
                                                    name="password"
                                                    placeholder="Nhập mật khẩu của bạn"
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? "Ẩn" : "Hiện"}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4" type="submit">
                                        Đăng nhập
                                    </Button>
                                </form>
                            </TabsContent>
                            <TabsContent value="register">
                            <form onSubmit={handleRegister}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_name">Tên tài khoản</Label>
                                            <Input id="register_name" name="name" placeholder="Nhập tên tài khoản của bạn" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_email">Email</Label>
                                            <Input id="register_email" name="email" placeholder="Nhập email của bạn" type="email" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_password">Mật khẩu</Label>
                                            <Input id="register_password" name="password" placeholder="Tạo mật khẩu" type="password" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_confirmPassword">Xác nhận mật khẩu</Label>
                                            <Input id="register_confirmPassword" name="confirmPassword" placeholder="Xác nhận mật khẩu" type="password" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_dob">Ngày sinh</Label>
                                            <Input id="register_dob" name="dob" type="date" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_gender">Giới tính</Label>
                                            <select id="register_gender" name="gender" required className="border p-2 rounded">
                                                <option value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register_address">Địa chỉ</Label>
                                            <Input id="register_address" name="address" placeholder="Nhập địa chỉ của bạn" required />
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4" type="submit">
                                        Đăng ký
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button variant="outline" className="w-full">
                            Tiếp tục với Facebook
                        </Button>
                        <Button variant="outline" className="w-full mt-2">
                            Tiếp tục với Gmail
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

