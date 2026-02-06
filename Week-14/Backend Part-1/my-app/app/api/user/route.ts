import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export function GET() {
    // database logic perform here
    return Response.json({
        email: "anand@gmail.com",
        name: "Anand"
    })
}

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const{ username, password} = body;

        if(!username || !password){
            return NextResponse.json({
                error: "Username and password are required"
            },
            { status: 400 }
        )
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        console.log(user.id);

        return NextResponse.json(
            { message: "Signed up successfully" },
            { status: 201 }
        );
    }catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
        );
    }
}