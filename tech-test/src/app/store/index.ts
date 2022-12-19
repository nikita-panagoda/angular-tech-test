import {ActionReducerMap} from '@ngrx/store';
import * as fromTodo from '../modules/todo/state/todo.reducer';

export interface AppState {
  [fromTodo.todoFeatureKey]: fromTodo.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromTodo.todoFeatureKey]: fromTodo.reducer,
};
