'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import AuthContext from "@contexts/auth/AuthContext"
import ThemeContext from "@contexts/ThemeContext"
import { EyeIcon, EyeOffIcon, Facebook, Mail } from "lucide-react"
import { useContext, useRef, useState } from "react"

export default function AuthForms() {
    const habits = ['Sports', 'Music', 'Movies', 'Books', 'Technology', 'Travel', 'Food', 'Art']
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const isVisible = useRef(false)
    const [tab, setTab] = useState("login");
    const { router } = useContext(ThemeContext)
    const { userLogin, updateCookie } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // Thực hiện đăng nhập
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries()); // Chuyển FormData thành đối tượng

            const response = await fetch('/api/account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Gửi dữ liệu dưới dạng JSON
            });
            // Kiểm tra response status
            if (response.status === 500) {
                throw new Error('Lỗi server, vui lòng thử lại sau');
            }
            if (!response.ok) {
                throw new Error('Lỗi kết nối')
            }
            // Lưu vào sessionStorage
            sessionStorage.setItem('user', JSON.stringify(result.user));

            // Đăng nhập thành công, chuyển hướng về trang chủ
            router.push('/')
        } catch (error) {
            console.error('Error:', error.message);
            // Hiển thị thông báo lỗi
        }
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100">
            <Card className={`w-[400px] m-auto transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                <CardHeader>
                    <CardTitle className='text-center font-serif text-[3rem]'>Charisma</CardTitle>
                    <CardDescription className='text-center'>In value we trust</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" onValueChange={(value) => setTab(value)}>
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <form onSubmit={handleSubmit} id={tab} >
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="login_email">Email</Label>
                                        <Input id="login_email" name='login_email' placeholder="Enter your email" type="email" required />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="login_password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="login_password"
                                                placeholder="Enter your password"
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
                            <form id={tab} >
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-name">Full Name</Label>
                                        <Input id="register-name" placeholder="Enter your full name" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-email">Email</Label>
                                        <Input id="register-email" placeholder="Enter your email" type="email" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="register-password">Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="register-password"
                                                placeholder="Create a password"
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
                                        <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="register-confirm-password"
                                                placeholder="Confirm your password"
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
                                        <Label>Gender</Label>
                                        <RadioGroup defaultValue="female">
                                            <div className="flex space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="male" id="male" />
                                                    <Label htmlFor="male">Male</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="female" id="female" />
                                                    <Label htmlFor="female">Female</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="other" id="other" />
                                                    <Label htmlFor="other">Other</Label>
                                                </div>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="register-dob">Date of Birth</Label>
                                        <Input id="register-dob" type="date" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="register-interests">Interests</Label>
                                        <Select>
                                            <SelectTrigger id="register-interests">
                                                <SelectValue placeholder="Select your interests" />
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
                        {tab === "login" ? "Login" : "Create Account"}
                    </Button>
                    <Separator className="my-4" />
                    <div className="grid w-full gap-2">
                        <Button variant="outline" className="w-full">
                            <Facebook className="mr-2 h-4 w-4 " />
                            Continue with Facebook
                        </Button>

                        <Button variant="outline" className="w-full">
                            <Mail className="mr-2 h-4 w-4" />
                            Continue with Gmail
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}
