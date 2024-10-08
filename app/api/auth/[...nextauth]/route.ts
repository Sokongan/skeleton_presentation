import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from "bcryptjs";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                // Fetch the user by username from the database
                const user = await prisma.users.findUnique({
                    where: { username: credentials.username },
                });

                if (!user || !user.active) {
                    // If user does not exist or is inactive, return null
                    return null;
                }

                // Compare the provided password with the hashed password in the database
                const isValidPassword = await compare(credentials.password, user.password);

                if (!isValidPassword) {
                    return null; // Return null if the password doesn't match
                }

                // If valid, return the user object
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.first_name,
                    lastName: user.last_name,
                };
            },
        }),
    ],
    pages: {
        signIn: '/auth/login', // Custom login page
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.firstName = token.firstName;
            session.user.lastName = token.lastName;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
