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

import { loginUser } from "@/services/api"

export default function AuthPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');


    const handleLogin = async () => {

        const response = await loginUser(email, password)
        console.log(response)
        const { token } = response.data
        setToken(token)
        localStorage.setItem('token', token)    // sayfa yenilendiginde gitmesin 
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
                            <Button type="submit" className="w-full">
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
