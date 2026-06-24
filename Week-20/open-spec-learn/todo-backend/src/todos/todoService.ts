import type { Todo } from "./todo.js";

export type TodoCreationParams = Pick<Todo, "title" | "description">

export class TodoService{
    public get(todoId: string): Todo {
        return {
            id: todoId,
            title: "Mocked Todo",
            description: "Mocked Todo....",
            done: false
        }
    }

    public create(todoCreationParams: TodoCreationParams): Todo {
        console.log("mock db call");
        
        return{
            id: "1",
            title: "Mocked Todo",
            description: "Mocked Todo....",
            done: false
        }
    }
}