import { prisma } from "../lib/prisma.js";

async function main () {
    await prisma.user.update({
        where: {
            id: 1
        },
        data: {
            name: "First"
        }
    })
}

main()
    .then(async ()=>{
        await prisma.$disconnect()
    })
    .catch( async (e)=>{
        console.log(e);
        await prisma.$disconnect();
        process.exit(1)
    })