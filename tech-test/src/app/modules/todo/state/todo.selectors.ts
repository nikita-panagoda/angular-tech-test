import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTodo from './todo.reducer';

export const selectTodosState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);
