import {Injectable} from '@angular/core';
import {ApiService} from '../../../../core/resources/services/api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITodo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService extends ApiService {
  apiUrl = '/tasks';

  constructor(http: HttpClient) {
    super(http);
  }

  getTodos(): Observable<ITodo[]> {
    return this.get<ITodo[]>(`${this.apiUrl}`);
  }

  getTodoById(id: number): Observable<ITodo> {
    return this.get<ITodo>(`${this.apiUrl}/${id}`);
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    return this.post(`${this.apiUrl}`, todo);
  }

  editTodo(todo: ITodo): Observable<ITodo> {
    return this.patch(`${this.apiUrl}/${todo.id}`, todo);
  }

  removeTodo(id: number): Observable<ITodo> {
    return this.delete(`${this.apiUrl}/${id}`);
  }
}
