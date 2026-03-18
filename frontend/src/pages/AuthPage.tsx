import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { useNavigate } from "react-router";

import { loginUser, registerUser } from "@/services/api"

import { z } from 'zod'

const authSchema = z.object({
    email: z.email('Geçerli bir email girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı')
})


export default function AuthPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

    const navigate = useNavigate();

    const handleLogin = async () => {

        const validation = authSchema.safeParse({ email, password });   // safeParse() ile veriler kontrol edilir, hata oldugunda bize bir obje doner
        if (!validation.success) {
            const fieldErrors: { email?: string, password?: string } = {}
            validation.error.issues.forEach(err => {
                if (err.path[0] === 'email') {
                    fieldErrors.email = err.message
                }
                else if (err.path[0] === 'password') {
                    fieldErrors.password = err.message
                }
            })
            setErrors(fieldErrors)
            return                      // return olmazsa, hata olsa bile asagidaki kisim da calisirdi !
        }

        const response = await loginUser(email, password)
        console.log(response)
        const { token } = response.data
        setToken(token)
        localStorage.setItem('token', token)    // sayfa yenilendiginde gitmesin 
        navigate('/dashboard')
    }


    const handleRegister = async () => {

        const registerValidation = authSchema.safeParse({ email, password })
        if (!registerValidation.success) {
            // console.log(registerValidation)
            console.log(registerValidation.error)
            const fieldErrors: { email?: string, password?: string } = {}
            registerValidation.error.issues.forEach((item) => {
                if (item.path[0] === 'email') {
                    fieldErrors.email = item.message
                }
                else if (item.path[0] === 'password') {
                    fieldErrors.password = item.message
                }
            })
            setErrors(fieldErrors)
            return
        }

        const response = await registerUser(email, password)
        console.log(response)
        const { token } = response.data
        setToken(token)
        localStorage.setItem('token', token)

    }

    return (

        <div>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="login">LOGIN</TabsTrigger>
                    <TabsTrigger value="register">REGISTER</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">Sign Up</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                            {/* <a
                                                href="#"
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </a> */}
                                        </div>
                                        <Input id="password" type="password" required placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" onClick={() => handleLogin()}>
                                Login
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Login with Google
                            </Button> */}
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="register">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Create an account</CardTitle>
                            <CardDescription>
                                Enter your information below to create your account
                            </CardDescription>
                            <CardAction>
                                <Button variant="link">Login</Button>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    {/* <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            type="text"
                                            placeholder="yourusername"
                                            required
                                        />
                                    </div> */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">Password</Label>
                                        </div>
                                        <Input id="password" type="password" required placeholder="**********" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button type="submit" className="w-full" onClick={() => handleRegister()}>
                                Create Account
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Sign up with Google
                            </Button> */}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div >

    )
}
