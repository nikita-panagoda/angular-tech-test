import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {addNewTodo, editTodo} from '../state/todo.actions';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ITodo} from '../resources/models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  isEdit = false;
  todo: ITodo | null = null;

  form = new FormGroup({
    label: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  get label() {
    return this.form.controls.label as FormControl;
  }

  get description() {
    return this.form.controls.description as FormControl;
  }

  get category() {
    return this.form.controls.category as FormControl;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store, private dialogRef: MatDialogRef<TodoFormComponent>,
  ) {
    if (data) {
      this.todo = data;
      this.isEdit = true;

      this.form.patchValue({
        label: data.label,
        description: data.description,
        category: data.category
      });
    }
  }

  onSubmit() {
    this.form.markAllAsTouched();

    if (this.isEdit) {
      this.store.dispatch(editTodo({
        todo: {
          id: this.todo.id,
          ...this.form.value,
          done: this.todo.done
        }
      }));
    } else {
      this.store.dispatch(addNewTodo({
        todo: {
          id: Math.random(),
          ...this.form.value,
          done: false
        }
      }));
    }

    this.dialogRef.close();
  }
}
