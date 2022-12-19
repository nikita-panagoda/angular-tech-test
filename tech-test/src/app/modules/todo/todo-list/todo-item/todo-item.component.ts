import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {editTodo, removeTodo} from '../../state/todo.actions';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {TodoFormComponent} from '../../todo-form/todo-form.component';
import {ITodo} from '../../resources/models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: ITodo;
  checked = false;

  constructor(private store: Store, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.checked = !!this.todo.done;
  }

  removeTodo(id: number) {
    this.store.dispatch(removeTodo({id}));
  }

  openFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.todo;

    this.dialog.open(TodoFormComponent, dialogConfig);
  }

  onChange() {
    this.store.dispatch(editTodo({
      todo: {
        ...this.todo,
        done: this.checked ? new Date().toLocaleDateString() : false,
      }
    }));
  }
}
