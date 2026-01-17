import { prisma } from "../lib/prisma.js";

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            email,
            password,
            firstName,
            lastName
        },
        // for filtering what you need
        select: {
            id: true,
            password: true
        }
    })
    console.log(res);
}

insertUser('temp@gmail.com','123456','temp','kumar')
    .then(()=>{
        console.log("Success");
    })
    .catch((e)=>{
        console.log(e);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    })