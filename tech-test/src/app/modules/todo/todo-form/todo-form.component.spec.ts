import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoFormComponent} from './todo-form.component';
import {select, Store, StoreModule} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppState, reducers} from '../../../store';
import {ITodo} from '../resources/models/todo';
import * as TodoActions from '../state/todo.actions';
import {selectTodos} from '../state/todo.selectors';
import {addNewTodoSuccess} from '../state/todo.actions';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;
  let store: Store<AppState>;
  const todo: ITodo = {
    id: 1,
    label: 'Kitchen Cleanup',
    description: 'Clean my dirty kitchen',
    category: 'house',
    done: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: false,
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionWithinNgZone: true,
            strictActionTypeUniqueness: true,
          }
        })
      ],
      declarations: [TodoFormComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch an action to add new todo', () => {
    fixture.ngZone.run(() => {
      const action = TodoActions.addNewTodo({todo});
      store.dispatch(action);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  it('should dispatch an action to edit todo', () => {
    fixture.ngZone.run(() => {
      const action = TodoActions.editTodo({todo});
      store.dispatch(action);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  it('should create a todo', () => {
    fixture.ngZone.run(() => {
      const action = TodoActions.addNewTodoSuccess({todo});
      store.dispatch(action);
      const todos$ = store.pipe(select(selectTodos));
      todos$.subscribe(data => {
        expect(data.length).toBe(1);
      });
    });
  });

  it('should edit a todo', () => {
    fixture.ngZone.run(() => {
      const addAction = TodoActions.addNewTodoSuccess({todo});
      store.dispatch(addAction);

      const updatedTodo: ITodo = {...todo, category: 'home'};

      const editAction = TodoActions.editTodoSuccess({todo: updatedTodo});
      store.dispatch(editAction);

      const todos$ = store.pipe(select(selectTodos));
      todos$.subscribe(data => {
        expect(data[0].category).toBe(updatedTodo.category);
      });
    });
  });
});
