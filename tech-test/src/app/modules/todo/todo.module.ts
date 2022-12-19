import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {TodoEffects} from './state/todo.effects';
import {TodoComponent} from './todo.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-list/todo-item/todo-item.component';
import {TodoFormComponent} from './todo-form/todo-form.component';
import {SharedModule} from '../../shared/shared.module';
import {FilterTodosPipe} from './resources/pipes/filter-todos.pipe';

@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoFormComponent,
    FilterTodosPipe
  ],
  exports: [
    TodoComponent
  ],
  imports: [
    EffectsModule.forFeature([TodoEffects]),
    CommonModule,
    SharedModule,
  ],
})
export class TodoModule {
}

