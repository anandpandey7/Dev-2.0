import express from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

const userProfileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});

type FinalUserSchema = z.infer<typeof userProfileSchema>;

app.put('/user', (req, res) => {
  const parsed = userProfileSchema.safeParse(req.body);
  const updateBody: FinalUserSchema = req.body; // compiletime check

  if (!parsed.success) {
    return res.status(422).json({
      success: false,
      error: parsed.error.format(),
    });
  }

//   const updateBody = parsed.data;

  res.json({
    success: true,
    message: "User updated",
    updateBody,
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
