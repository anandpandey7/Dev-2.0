import { prisma } from '../lib/prisma.js';

async function main() {
    await prisma.post.create({
        data: {
            title: "Title of post",
            content: "My new Apachi RR 310",
            published: false,
            authorId: 1
        }
    })
}

main()
    .then(async ()=>{
        await prisma.$disconnect()
    })
    .catch(async (e)=>{
        console.group(e)
        await prisma.$disconnect()
        process.exit(1)
    })