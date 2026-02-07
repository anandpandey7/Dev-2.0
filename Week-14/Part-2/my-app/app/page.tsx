import { prisma } from "@/lib/prisma";
import axios from "axios";

async function fetchData(){
  // const response = await axios.get("https://dummyjson.com/c/c785-a372-43c4-81d0");
  // await new Promise(r=> setTimeout(r,2000));
  // console.log("response is " + JSON.stringify(response.data));
  // return response.data;

  const user = await prisma.user.findFirst();

  return {
    email: user?.email,
    name: "Anand"
  }
}

export default async function Home() {
  const data = await fetchData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hello, Next.js!</h1>
      <div>
        {data.name}
        <br/> 
        {data.email}
      </div>
    </main>
  );
} 