import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {  FormBuilder } from '@angular/forms';

import { Todo } from 'src/app/models/todo';
import { RemoteTodoService } from 'src/app/services/remote-todo.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public todoContent = '';
  public currTodoId = '';
  public todos: Todo[] = [];

  @ViewChild('closebutton') closebutton!: ElementRef;
  @ViewChild('openTodoModal') openTodoModal!: ElementRef;
  @ViewChild("todoInput") todoInput!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService, private remoteTodoService: RemoteTodoService) {
    // this.todos = todoService.getTodos();
  }

  ngOnInit(): void {
    this.getTodos();
  }


  public addTodoItem() {
    console.log("Adding Todo: ", this.todoContent);

    if (this.todoContent != null && this.todoContent != undefined && this.todoContent.length > 0) {

      if (this.currTodoId != '') {
        // Update Todo with Id
        console.log("Updating Todo with Id: ", this.currTodoId);
        // this.todoService.updateTodo(this.currTodoId, this.addTodo);

        this.remoteTodoService.updateTodo(this.currTodoId, this.todoContent).subscribe(data => {
          console.log("Response: ", data);
          if (data.success) {
            this.getTodos();
          }
        });

      } else {
        // Add New Todo
        console.log('Adding New Todo!!');
        // this.todoService.addTodo(this.addTodo);

        this.remoteTodoService.createTodo(this.todoContent).subscribe(data => {
          console.log('Created New Todo: ', data);
          if (data.success) {
            this.getTodos();
          }
        });
      }
      
      this.todoContent = '';
      this.currTodoId = '';
      this.closebutton.nativeElement.click();
    }
  }

  private getTodos() {
    this.remoteTodoService.getTodos().subscribe(data => {
      console.log('data: ', data);
      if (data.success) {
        this.todos = data.response;
      }
    });
  }

  public updateTodo(todo: Todo) {
    this.currTodoId = todo._id;
    this.todoContent = todo.content;

    this.openTodoModal.nativeElement.click();
  }

  public deleteTodo(todo: Todo) {
    // this.todoService.removeTodo(todo);
    this.remoteTodoService.deleteTodo(todo._id).subscribe(data => {
      console.log('Response: ', data);

      if (data.success) {
        this.getTodos();
      }
    });
  }

  @HostListener('window:keydown.control.a', ['$event'])
  public showTodoModel(event: KeyboardEvent) {
    event.preventDefault();
    this.openTodoModal.nativeElement.click();
    setTimeout(() => {
      console.log("Setting Focus on: ", this.todoInput);
      this.todoInput.nativeElement.focus();
    }, 0);
  }

  public onEnterPressed(event: Event) {
    event.preventDefault();
    this.addTodoItem();
  }
}
