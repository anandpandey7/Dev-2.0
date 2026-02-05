import { NextRequest } from "next/server"
export function GET() {
    // database logic perform here
    return Response.json({
        email: "anand@gmail.com",
        name: "Anand"
    })
}

export async function POST(req: NextRequest){
    // extract the body
    const body = await req.json();
    // store the body in the DB
    console.log(body);

    return Response.json({
        message: "You are logged in!"
    })
}