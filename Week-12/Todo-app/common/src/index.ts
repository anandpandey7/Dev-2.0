import { z } from "zod";
export const signupInput = z.object({
    username: z.string(),
    password: z.string()
})
// console.log("hi there");

export const todoInput = z.object({
    title: z.string().min(1,"Tittle cannot be empty"),
    description: z.string().optional(),
})

export type SignupParams = z.infer<typeof signupInput>;
export type TodoParams = z.infer<typeof todoInput>;