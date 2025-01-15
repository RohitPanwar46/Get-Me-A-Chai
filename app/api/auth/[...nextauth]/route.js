import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose'
import User from '@/models/User'
import connectDB from '@/db/connectDb'

const handler = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        await connectDB()
        // check if user already exists in the database
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // if not, create a new user
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0],
          }); 
          await newUser.save()
        }
        return true;
      }
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username
      return session
    },
  }
})

export { handler as GET, handler as POST }