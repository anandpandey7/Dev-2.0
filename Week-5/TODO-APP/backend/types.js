const zod = require('zod');

const createTodoSchema = zod.object({
  title: zod.string().min(1, 'Title is required'),
  description: zod.string().optional(),
});

const updateTodoSchema = zod.object({
  id: zod.string(),
});

const deleteTodoSchema = zod.object({
  id: zod.string(),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  deleteTodoSchema,
};