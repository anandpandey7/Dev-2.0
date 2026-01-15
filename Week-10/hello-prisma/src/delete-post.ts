import { prisma } from "../lib/prisma.js";

async function main( ) {
    await prisma.post.deleteMany({
        where: {
            authorId: 1,
            published: false
        }
    })
}

main()
    .then(async ()=>{
        console.log("done");
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })