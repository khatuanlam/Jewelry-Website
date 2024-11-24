'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AuthContext from "@/contexts/auth/AuthContext"
import { EyeIcon, EyeOffIcon, Facebook, Mail } from "lucide-react"
import { useContext, useRef, useState } from "react"

export default function AuthForms() {
    const habits = ['Thể thao', 'Âm nhạc', 'Phim ảnh', 'Sách', 'Công nghệ', 'Du lịch', 'Ẩm thực', 'Nghệ thuật']
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isVisible = useRef(false)
    const [tab, setTab] = useState("login");
    const { userLogin, updateCookie } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Lỗi kết nối')
            }
        } catch (error) {
            // Xử lý lỗi
        }
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
            <div className="flex w-full max-w-[800px] bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="w-1/2 relative hidden md:block">
                    <Image
                        src="/assets/images/login.jpeg? height=600&width=400"
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
                        <Tabs defaultValue="login" onValueChange={(value) => setTab(value)}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                                <TabsTrigger value="register">Đăng ký</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <form action={handleSubmit} id={tab}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_email">Email</Label>
                                            <Input id="login_email" name='login_email' placeholder="Nhập email của bạn" type="email" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_password">Mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="login_password"
                                                    placeholder="Nhập mật khẩu của bạn"
                                                    type={showPassword ? "text" : "password"}
                                                    name='login_password'
                                                    required
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon className="h-4 w-4" />
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="register">
                                <form id={tab}>
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-name">Họ và tên</Label>
                                            <Input id="register-name" placeholder="Nhập họ và tên của bạn" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-email">Email</Label>
                                            <Input id="register-email" placeholder="Nhập email của bạn" type="email" />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-password">Mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="register-password"
                                                    placeholder="Tạo mật khẩu"
                                                    type={showPassword ? "text" : "password"}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? (
                                                        <EyeOffIcon className="h-4 w-4" />
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="register-confirm-password">Xác nhận mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="register-confirm-password"
                                                    placeholder="Xác nhận mật khẩu của bạn"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                >
                                                    {showConfirmPassword ? (
                                                        <EyeOffIcon className="h-4 w-4" />
                                                    ) : (
                                                        <EyeIcon className="h-4 w-4" />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label>Giới tính</Label>
                                            <RadioGroup defaultValue="female">
                                                <div className="flex space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="male" id="male" />
                                                        <Label htmlFor="male">Nam</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="female" id="female" />
                                                        <Label htmlFor="female">Nữ</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="other" id="other" />
                                                        <Label htmlFor="other">Khác</Label>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="register-dob">Ngày sinh</Label>
                                            <Input id="register-dob" type="date" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="register-interests">Sở thích</Label>
                                            <Select>
                                                <SelectTrigger id="register-interests">
                                                    <SelectValue placeholder="Chọn sở thích của bạn" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {habits.map((habit, index) => (
                                                        <SelectItem key={`${habit.toLowerCase()}-${index}`} value={habit.toLowerCase()}>
                                                            {habit}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full mb-4" type='submit' form={tab === 'login' ? 'login' : 'register'}>
                            {tab === "login" ? "Đăng nhập" : "Tạo tài khoản"}
                        </Button>
                        <Separator className="my-4" />
                        <div className="grid w-full gap-2">
                            <Button variant="outline" className="w-full">
                                <Facebook className="mr-2 h-4 w-4 " />
                                Tiếp tục với Facebook
                            </Button>

                            <Button variant="outline" className="w-full">
                                <Mail className="mr-2 h-4 w-4" />
                                Tiếp tục với Gmail
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
