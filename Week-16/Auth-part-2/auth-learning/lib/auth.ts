import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { signIn } from "next-auth/react";

export const NEXT_AUTH = {
  providers:  [
    CredentialsProvider({
      name: 'email',
      credentials: {
        username: {label: 'email', type: 'text', placeholder: 'Email'},
        password: {label: 'password', type: 'password', placeholder: 'Password'}
      },
      async authorize(credentials: any){
        console.log(credentials);

        // normally you check DB here
        if (credentials?.username && credentials?.password) {

          const username = credentials.username;
          const password = credentials.password
          
          return {
              id: "user1",
              name: "Demo User",
              email: username,
          };
        }
        return null;
      }
    }),
    GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || ""
  })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: ({token , user}) => {
      token.userId = token.sub;

      return token;
    },
    session: ({session, token, user}: any) =>{
      if(session && session.user){
        session.user.id = token.userId;
      }
      return session;
    }
  },
  pages: {
    signIn: "/signin"
  }
}