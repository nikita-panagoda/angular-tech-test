import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as TodosActions from './todo.actions';
import {AppState} from '../../../store';
import {TodoApiService} from '../resources/services/todo-api.service';
import {Store} from '@ngrx/store';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions,
              private service: TodoApiService,
              private store: Store<AppState>) {
  }

  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.loadTodos),
      mergeMap(() => this.service.getTodos()
        .pipe(
          map(todos => TodosActions.loadTodosSuccess({todos})),
          catchError(error => of(TodosActions.loadTodosFailure({error})))
        )
      )
    );
  });

  addNewTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.addNewTodo),
      mergeMap((action) => this.service.createTodo(action.todo)
        .pipe(
          map((response) => TodosActions.addNewTodoSuccess({todo: response})),
          catchError(error => of(TodosActions.addNewTodoFailure({error})))
        )
      )
    );
  });

  editTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.editTodo),
      mergeMap((action) => this.service.editTodo(action.todo)
        .pipe(
          map((response) => TodosActions.editTodoSuccess({todo: response})),
          catchError(error => of(TodosActions.editTodoFailure({error})))
        )
      )
    );
  });

  removeTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosActions.removeTodo),
      mergeMap((action) => this.service.removeTodo(action.id)
        .pipe(
          map((response) => TodosActions.removeTodoSuccess({id: action.id})),
          catchError(error => of(TodosActions.removeTodoFailure({error})))
        )
      )
    );
  });
}
