// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Email",
//       credentials: {
//         username: {
//           label: "Email",
//           type: "text",
//           placeholder: "Email",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "Password",
//         },
//       },

//       async authorize(credentials) {
//         console.log(credentials);

//         // normally you check DB here
//         if (credentials?.username && credentials?.password) {

//             const username = credentials.username;
//             const password = credentials.password
//           return {
//             id: "user1",
//             name: "Demo User",
//             email: username,
//           };
//         }

//         return null;
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,
// });

// export const GET = handler;
// export const POST = handler;






// export async function GET(req: NextRequest, {params}: {params: Promise<{authroutes: string[]}>}) {
//     // { params }: { params: Promise<{ authRoutes: string[] }> }
//     const resolvedParams = await params;

//     console.log(resolvedParams);

//     return NextResponse.json({
//         message: "asd"
//     })
// }



import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NEXT_AUTH } from "@/lib/auth";

const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;