import {z} from '@hono/zod-openapi';

export const UserSchema = z.object({
  name: z.string().min(1).max(50).openapi({
    description: 'The name of the user',
    example: 'John Doe'
  }),
  age: z.number().int().openapi({
    description: 'The age of the user',
    example: 19
  }),
  id: z.string().min(1).max(10).openapi({
    description: 'The ID of the user',
    example: '123'
  })
});