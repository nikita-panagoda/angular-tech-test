import {createReducer, on} from '@ngrx/store';
import {ITodo} from '../resources/models/todo';
import * as TodosActions from './todo.actions';

export const todoFeatureKey = 'todo';

export interface State {
  todos: ITodo[];
  error: any;
}

export const initialState = {
  todos: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(TodosActions.loadTodosSuccess, (state, action) => {
    return {
      ...state,
      todos: action.todos
    };
  }),
  on(TodosActions.loadTodosFailure, (state, action) => {
    return {
      ...state,
      error: action.error
    };
  }),
  on(TodosActions.addNewTodoSuccess, (state, action) => {
    return {
      ...state,
      todos: [...state.todos, action.todo]
    };
  }),
  on(TodosActions.addNewTodoFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(TodosActions.removeTodoSuccess, (state, action) => {
    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.id)
    };
  }),
  on(TodosActions.removeTodoFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
  on(TodosActions.editTodoSuccess, (state, action) => {
    return {
      ...state,
      todos: state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo)
    };
  }),
  on(TodosActions.editTodoFailure, (state, action) => ({
    ...state,
    error: action.error
  })),
);
