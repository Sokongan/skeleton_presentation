'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const description = "A simple login form with username and password. The submit button says 'Sign in'.";

export function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await signIn('credentials', {
            redirect: true,
            username,
            password,
            callbackUrl: '/employees'
        });

        if (res?.error) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <Card className="w-full max-w-sm">
            <form onSubmit={handleSubmit}>
                <CardHeader>
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">DOJ Skeleton App</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your username below to login to your account
                        </p>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
