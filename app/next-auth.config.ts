import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Use a Prisma Client singleton to avoid multiple instances in development
let prisma: PrismaClient;

if (!global.prisma) {
    global.prisma = new PrismaClient();
}

prisma = global.prisma;

export const NEXT_AUTH_OPTIONS = {
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days token expiration
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text', placeholder: 'Your username' },
                password: { label: 'Password', type: 'password', placeholder: 'Your password' },
            },

            async authorize(credentials) {
                const { username, password } = credentials;

                try {
                    const user = await prisma.user.findUnique({
                        where: { username },
                    });

                    if (!user) {
                        return null; // User not found
                    }

                    const valid = await bcrypt.compare(password, user.password);
                    if (!valid) {
                        return null; // Invalid password
                    }

                    return {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        middleName: user.middleName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role, // Include the role in the returned object
                    };
                } catch (error) {
                    console.error("Error during authentication:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            // Attach custom user data to session object
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Store user data in JWT token
            if (user) {
                token.user = user;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};
