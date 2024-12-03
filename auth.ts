import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Define auth options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.error('Missing username or password');
          return null;
        }
        
        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
            include: {
              UserRole: {
                include: {
                  role: true
                }
              }
            }
          })
          
          if (!user) {
            console.error('User not found:', credentials.username);
            return null;
          }

          // Validate password here if necessary
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) {
            console.error('Invalid password for user:', credentials.username);
            return null;
          }

          // Extract roles from UserRole
          const roles = user.UserRole.map((userRole: { role: { name: any } }) => userRole.role.name); // Assuming role has a 'name' field

          return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: roles // Return the roles as an array of strings
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.roles = user.roles;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.roles = token.roles;
      }
      console.log('Session:', session);
      return session;
    }
  }
}

// Helper function to get session without passing config every time
export function auth() {
  return getServerSession(authOptions)
} 