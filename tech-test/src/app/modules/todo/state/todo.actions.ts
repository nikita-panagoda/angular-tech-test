import {createAction, props} from '@ngrx/store';
import {ITodo} from '../resources/models/todo';

export const loadTodos = createAction(
  '[TodoList Component] Load Todos',
);

export const loadTodosSuccess = createAction(
  '[Todo Api Service] Load Todos Success',
  props<{ todos: ITodo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo Api Service] Load Todos Failure',
  props<{ error: any }>()
);

export const addNewTodo = createAction(
  '[Todo Form Component] Add new todo',
  props<{ todo: ITodo }>()
);

export const addNewTodoSuccess = createAction(
  '[Add Todo Effect] Add new todo success',
  props<{ todo: ITodo }>()
);

export const addNewTodoFailure = createAction(
  '[Add Todo Effect] Add new todo failure',
  props<{ error: any }>()
);

export const editTodo = createAction(
  '[Todo Form Component] Edit todo',
  props<{ todo: ITodo }>()
);

export const editTodoSuccess = createAction(
  '[Edit Todo Effect] Edit todo success',
  props<{ todo: ITodo }>()
);

export const editTodoFailure = createAction(
  '[Edit Todo Effect] Edit todo failure',
  props<{ error: any }>()
);

export const removeTodo = createAction(
  '[Todo Item Component] Remove todo',
  props<{ id: number }>()
);

export const removeTodoSuccess = createAction(
  '[Remove Todo Effect] Remove todo success',
  props<{ id: number }>()
);

export const removeTodoFailure = createAction(
  '[Remove Todo Effect] Remove todo failure',
  props<{ error: any }>()
);
