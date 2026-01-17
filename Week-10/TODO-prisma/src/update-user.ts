import { prisma } from "../lib/prisma.js";

interface UpdateParams {
    firstName: string;
    lastName: string;
}

async function updateUser(email: string, {
    firstName,
    lastName
}: UpdateParams) {
    const res =await prisma.user.update({
        where: { email },
        data : {
            firstName,
            lastName
        }
    })
    console.log(res);
}


updateUser('temp1@gmail.com',{
    firstName: 'First',
    lastName: 'Kumar'
})
    .then(()=>{
        console.log("Success");
    })
    .catch((e)=>{
        console.log(e);
    })
    .finally(async ()=>{
        prisma.$disconnect();
    })
