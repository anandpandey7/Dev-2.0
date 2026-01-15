import { prisma } from '../lib/prisma.js';

async function main () {
    const users = await prisma.user.findMany({});
    console.log(users);

    const user = await prisma.user.findUnique({
        where: {
            id: 1
        },
        include: {
            posts: true
        }
    })
    console.log(user);
};

main()
    .then(async ()=>{
        await prisma.$disconnect()
    })
    .catch( async(e)=>{
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })