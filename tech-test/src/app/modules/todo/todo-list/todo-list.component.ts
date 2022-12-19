import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ITodo} from '../resources/models/todo';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {selectTodos} from '../state/todo.selectors';
import * as fromTodosActions from '../state/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() filter = '';
  todos$?: Observable<ITodo[]>;

  constructor(private store: Store<AppState>) {
    this.todos$ = this.store.pipe(select(selectTodos));
  }

  ngOnInit(): void {
    this.store.dispatch(fromTodosActions.loadTodos());
  }
}
