import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connect } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],


  async session({ session }) {
    const sessionUser = await User.findOne({
        email: session.user.email,
    })

    session.user.id = sessionUser._id.toString();

    return session;
  },


  async signIn({ profile }) {
    try {
      await connect();

      // check if a user already exists in the database
      const UserExists = await User.findOne({
        email: profile.email,
      });

      // if not, create a new user
      if (!UserExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.log("Sign in error: ", error);
      return false;
    }
  },
});

export { handler as GET, handler as POST };
