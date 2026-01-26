import { Hono } from 'hono'
import { decode, jwt, sign, verify } from 'hono/jwt';
import { PrismaClient } from '../src/generated/prisma/edge'
import { withAccelerate } from "@prisma/extension-accelerate";


type Bindings = {
  DATABASE_URL: string,
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.post('/api/v1/signup', async (c) => {
  // Initialize Prisma inside the fetch handler for Edge environments
  const prisma = new PrismaClient({
  accelerateUrl: c.env.DATABASE_URL as string, // Note the name change
}).$extends(withAccelerate());

  try {
    const body = await c.req.json()

    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.username,
        password: body.password,
      },
    })

    const token = await sign({
      id: user.id
    },c.env.JWT_SECRET);

    return c.json({ success: true, token})
  } catch (e) {
    c.status(500);
    return c.json({ error: "Error while signing up" })
  } finally {
    // Optional: In some edge cases, you might want to disconnect, 
    // though Prisma handles pooling well with Accelerate.
    await prisma.$disconnect()
  }
})

app.post('/api/v1/signin', async(c)=>{
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL as string, // Note the name change
  }).$extends(withAccelerate());

  try{
    const body = await c.req.json();

    if (!body.email || !body.password) {
      c.status(400)
      return c.json({ success: false, message: "Missing fields" })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    })

    if(!user){
      c.status(404);
      return c.json({success: false,
        message: "User not found"
      })
    }

    if(user.password !== body.password){
      c.status(400);
      return c.json({success: false,
        message: "Wrong Password"
      })
    }

    const token = await sign({id: user.id}, c.env.JWT_SECRET);
    return c.json({ success: true, token})
  }catch(e){
    c.status(500)
    return c.json({
      success: false,
      message: e.message
    })
  }finally{
    await prisma.$disconnect()
  }
})

export default app