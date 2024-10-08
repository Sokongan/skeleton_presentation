'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const description = "A simple login form with email and password. The submit button says 'Sign in'.";

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.push('/dashboard');
        // const res = await signIn('credentials', {
        //     redirect: false,
        //     email, // send the email as username for the login
        //     password,
        // });
        //
        // if (res?.error) {
        //     setError('Invalid credentials, please try again.');
        // } else {
        //     router.push('/dashboard'); // Redirect to dashboard after login
        // }
    };

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">DOJ Skeleton App</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your email below to login to your account
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" type="submit">
                        Sign in
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
