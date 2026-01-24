import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  email: string
) {
  
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    },
  });

  console.log(user);
}


const user = await insertUser(
  "anandtemp2",
  "securePass123",
  "Anand",
  "Raj","anandtemp2@gmail.com"
).then(()=>{
        console.log("Success");
    })
    .catch((e)=>{
        console.log(e);
    })
    .finally(async ()=>{
        await prisma.$disconnect();
    });
