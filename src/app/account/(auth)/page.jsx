'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountPage from "@app/ui/RootLayout/AccountPage"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import AuthContext from "@contexts/auth/AuthContext"
import ThemeContext from "@contexts/ThemeContext"
import { EyeIcon, EyeOffIcon, Facebook, Mail } from "lucide-react"
import Link from "next/link"
import { useContext, useRef, useState } from "react"


export default function AuthForms() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isVisible = useRef(false)
    const [tab, setTab] = useState("login");
    const { router, setShowNotification } = useContext(ThemeContext)
    const { login, isLoggedIn, userLogin, admin } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }


    // Thực hiện đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            let data = Object.fromEntries(formData.entries());

            let endpoint = '/api/account/register';

            // Xác định endpoint dựa trên tab hiện tại
            if (tab === 'login') {
                endpoint = '/api/account/login';

            } else {
                // Kiểm tra xác nhận mật khẩu
                if (data.password !== data.confirm_password) {
                    throw new Error('Mật khẩu xác nhận không khớp');
                }
            }
            console.log(data);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Lỗi kết nối');
            }
            // Kiểm tra response status
            if (response.status === 500) {
                throw new Error('Lỗi server, vui lòng thử lại sau');
            }
            else if (response.status === 202) {
                setShowNotification('Tài khoản của bạn đã bị khóa')

            } else {
                // Trả lại thông tin của người dùng
                const responseData = await response.json();
                const currentUser = JSON.stringify(responseData.updateUser);

                // Cập nhật trạng thái đăng nhập 
                login(currentUser)

                // Tải lại trang
                router.push('/')
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setShowNotification('Vui lòng kiểm tra lại thông tin nhập vào');
            } else if (error.response && error.response.status === 401) {
                setShowNotification('Tài khoản hoặc mật khẩu không đúng');
            } else {
                setShowNotification('Đã xảy ra lỗi, vui lòng thử lại sau');
            }
        }
    };

    return (
        isLoggedIn && admin == false ? (
            <AccountPage info={userLogin} />
        ) : (
            <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100" >
                <Card className={`w-[400px] m-auto transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <CardHeader>
                        <CardTitle className='text-center font-serif text-[3rem]'>Charisma</CardTitle>
                        <CardDescription className='text-center'>In value we trust</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="login" onValueChange={(value) => { setTab(value) }}>
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Đăng nhập</TabsTrigger>
                                <TabsTrigger value="register">Đăng ký</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                                <form onSubmit={handleSubmit} id={tab} >
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_email">Email</Label>
                                            <Input id="login_email" name='login_email' placeholder="Nhập email" type="email" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="login_password">Mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="login_password"
                                                    placeholder="Nhập mật khẩu"
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
                                <form onSubmit={handleSubmit} id={tab} >
                                    <div className="grid w-full items-center gap-4">
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-name">Họ và tên</Label>
                                            <Input id="register-name" name='name' placeholder="Nhập họ và tên" required
                                            />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-email">Email</Label>
                                            <Input id="register-email" name='email' placeholder="Nhập đỉa chỉ email" type="email" required />
                                        </div>
                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-password">Mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="register-password"
                                                    placeholder="Mật khẩu"
                                                    type={showPassword ? "text" : "password"}
                                                    name='password'
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
                                        <div className="space-y-1.5">
                                            <Label htmlFor="register-confirm-password">Nhập lại mật khẩu</Label>
                                            <div className="relative">
                                                <Input
                                                    id="register-confirm-password"
                                                    placeholder="Nhập lại mật khẩu"
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    name='confirm_password'
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
                                            <RadioGroup defaultValue="male" name='gender'>
                                                <div className="flex space-x-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="male" id="male" />
                                                        <Label htmlFor="male">Nam</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="female" id="female" />
                                                        <Label htmlFor="female">Nữ</Label>
                                                    </div>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="space-y-1.5">
                                            <Label htmlFor="register-dob">Ngày sinh</Label>
                                            <Input id="register-dob" name='dob' type="date" required />
                                        </div>

                                        <div className="flex flex-col space-y-1.5">
                                            <Label htmlFor="register-email">Địa chỉ</Label>
                                            <Input id="register-email" name='address' placeholder="" required />
                                        </div>
                                    </div>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full mb-4" type='submit' form={tab === 'login' ? 'login' : 'register'}>
                            {tab === "login" ? "Đăng nhập" : "Đăng ký"}
                        </Button>
                        <Separator className="my-4" />
                        <div className="grid w-full gap-2">
                            <Link href={'https://www.facebook.com'}>
                                <Button variant="outline" className="w-full">
                                    <Facebook className="mr-2 h-4 w-4" />
                                    Đăng nhập bằng Facebook
                                </Button>
                            </Link>
                            <Link href={'https://mail.google.com/'}>
                                <Button variant="outline" className="w-full">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Đăng nhập bằng Gmail
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        )
    )
}