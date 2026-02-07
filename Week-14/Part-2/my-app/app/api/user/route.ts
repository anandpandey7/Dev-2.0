import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface CreateUser {
    email: string,
    password: string
}

export function GET(req: NextRequest ){
    return NextResponse.json({
        name: "Anand Raj",
        email: "anand@gamil.com"
    })
}

export async function POST(req: NextRequest){
    try{
        const body: CreateUser = await req.json();
        if(!body.email || !body.password){
            return NextResponse.json({
                success: false,
                message: "Email and password are required",
            },{status: 400})
        }

        // Although no need because db schema of email field is unique
        // const exist = await prisma.user.findFirst({
        //     where: {
        //         email : body.email,
        //     }
        // })

        // if(exist){
        //     return NextResponse.json({
        //         success: false,
        //         message: "Email already exists"
        //     },{status: 409})
        // }

        const hashedPass = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data:{
                email : body.email,
                password: hashedPass
            }
        })

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
            }, // NOTE: never return password, even hashed password
        },{status: 201});
    }
    // catch(error){
    //     return NextResponse.json({
    //         success: false,
    //         message: "Internal Server Error"
    //     },{status: 500})
    // }
    catch (error: any) {
    if (error.code === "P2002") {
        return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 409 }
        );
    }

    return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
    );
    }
}