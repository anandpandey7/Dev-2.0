const mongoose = require("mongoose");

// connect to mongodb database named 'todos'
mongoose.connect('mongodb+srv:  /todos');
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}