import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TodoFormComponent} from './todo-form/todo-form.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  filter = '';

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openFormDialog() {
    this.dialog.open(TodoFormComponent);
  }
}

