import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class RemoteTodoService {
  static BASE_URL = "http://127.0.0.1:9000/api/v1";

  constructor(private http: HttpClient) { }

  public getTodos(): Observable<any> {
    return this.http.get<any>(`${RemoteTodoService.BASE_URL}/get-todos`);
  }

  public createTodo(todo: string): Observable<any> {
    return this.http.post<any>(`${RemoteTodoService.BASE_URL}/create-todo`, { todo: todo });
  }
  
  public updateTodo(id: string, todo: string): Observable<any> {
    return this.http.post<any>(`${RemoteTodoService.BASE_URL}/update-todo`, { todoId: id, todo: todo });
  }
  
  public deleteTodo(id: string): Observable<any> {
    return this.http.delete<any>(`${RemoteTodoService.BASE_URL}/delete-todo/${id}`);
  }

  
}
