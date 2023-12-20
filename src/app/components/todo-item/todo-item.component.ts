import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  @Output() updateTodo: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  public removeTodo(todo: Todo): void {
    this.deleteTodo.emit(todo);

    console.log("Deleting Todo with Id: ", todo._id);
  }

  public editTodo(todo: Todo) {
    console.log('Updating Todo with Id: ', todo._id);
    this.updateTodo.emit(todo);
  }

}
