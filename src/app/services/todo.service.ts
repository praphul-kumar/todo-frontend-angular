import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos: Todo[] = [];
  private lastTodoId = '1';

  constructor() {
    this.todos = [
      { _id: "1", content: 'Create Simple static Header Component', status: 0 },
      { _id: '2', status: 0, content: 'Create Simple static Footer Component' },
      { _id: '3', status: 0, content: 'Create Main Conatiner Component' },
      { _id: '4', status: 0, content: 'Add floating button to add todo' },
      { _id: '5', status: 0, content: 'Create Todo Model' },
      { _id: '6', status: 0, content: 'Create Todo Services to manage todos' },
      { _id: '7', status: 0, content: 'List Todos in main component' },
      { _id: '8', status: 0, content: 'Add Action buttons to manage todos' }
    ];

    this.todos.reverse();

    this.lastTodoId = this.todos.length.toString();
  }

  public addTodo(todo: string): void {
    if (this.todos != null && this.todos.length > 0) {
      let id = (parseInt(this.todos[0]?._id) + 1);
      this.lastTodoId = id.toString();
    }

    let todoItem = new Todo(this.lastTodoId, todo);
    this.todos.splice(0, 0, todoItem);

    console.log("Added Todo: ", todoItem);
  }

  public updateTodo(todoId: string, todoContent: string): void {
    this.todos.map(todo => {
      if (todo._id === todoId) {
        todo.content = todoContent;
      }
    });
  }

  public removeTodo(todo: Todo): boolean {
    let response = false;
    if (this.todos.includes(todo)) {
      this.todos.splice(this.todos.indexOf(todo), 1);
      response = true;
    }

    return response;
  }

  public getTodos(): Todo[] {
    return this.todos;
  }
}
