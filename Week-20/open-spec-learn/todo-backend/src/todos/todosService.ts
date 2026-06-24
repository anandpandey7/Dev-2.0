import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import type { Todo } from "./todo.js";
import type { TodoCreationParams } from "./todoService.js";
import { TodoService } from "./todoService.js";

@Route("todo")
export class TodoController extends Controller {
    @Get("{todoId}")
    public async getTodo(@Path() todoId: string): Promise<Todo> {
        const todoService = new TodoService();
        return todoService.get(todoId);
    }
}