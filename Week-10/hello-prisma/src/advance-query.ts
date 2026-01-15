import { prisma } from "../lib/prisma-log.js";

async function main() {
    let res = await prisma.user.findMany({
        where: {
            email: {
                endsWith: 'gmail.com',
            },
            posts: {
                // Has altleast one post published
                some: {
                    published: true,
                },
            },
        },
        include: {
            posts: {
                where: {
                    published: true,
                },
            },
        },
    })
    console.log(res);
}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })