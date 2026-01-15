import { prisma } from "../lib/prisma-debug.js";

// SELECT * FROM "Post" OFFSET 0 LIMIT 10;
async function main(){
    let res= await prisma.post.findMany({
        take: 2,
        skip: 2
    })
    console.log(res);
}

main()
    .then(async ()=>{
        await prisma.$disconnect();
    })
    .catch(async (e)=>{
        console.log(e);
        await prisma.$disconnect;
        process.exit(1);
    })

