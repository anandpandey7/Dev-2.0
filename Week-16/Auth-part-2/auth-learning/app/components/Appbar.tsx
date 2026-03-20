"use client"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react";

export const Appbar = ()=>{
    const router = useRouter();
    return(
        <div className="flex bg-slate-900 w-full h-15 items-center justify-end p-5">
            {/* <button className="p-1 border-2 rounded-lg  " onClick={()=>{
                router.push("/api/auth/signin")
            }}> Signin 
            </button> */}
            <button className="p-1 border-2 rounded-lg  mr-5 bg-blue-700" onClick={()=>{
                signIn();
            }}> Signin 
            </button>

            <button className="p-1 border-2 rounded-lg bg-amber-950" onClick={()=>{
                signOut();
            }}> Logout 
            </button>
        </div>
    )
}