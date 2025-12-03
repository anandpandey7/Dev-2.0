const express = require('express');
const { todo } = require('./db');
const { createTodoSchema, updateTodoSchema, deleteTodoSchema } = require('./types');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());

app.post('/todos', async (req, res) => {
    try {
        const parseResult = createTodoSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(411).json({
                msg: 'Invalid payload',
                errors: parseResult.error.errors
            });
        }

        const { title, description } = req.body;

        const todoItem = new todo({
            title,
            description,
            completed: false
        });

        await todoItem.save();

        res.status(201).json(todoItem);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// GET ALL TODOS
app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

app.delete('/delete', async (req, res) => {
    try {
        const parseResult = deleteTodoSchema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(411).json({
                msg: 'Invalid payload',
                errors: parseResult.error.errors
            });
        }

        const { id } = req.body;

        const deleted = await todo.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json({ msg: "Todo deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});


// UPDATE TODO (mark completed)
app.put('/completed', async (req, res) => {
    const updatePayload = req.body;

    // Validate using Zod
    const parseResult = updateTodoSchema.safeParse(updatePayload);
    if (!parseResult.success) {
        return res.status(411).json({
            msg: 'Invalid payload',
            errors: parseResult.error.errors
        });
    }

    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            updatePayload.id,
            { completed: true },
            { new: true } // return updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});