import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoItemComponent} from './todo-item.component';
import {select, Store, StoreModule} from '@ngrx/store';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {AppState, reducers} from '../../../../store';
import * as TodoActions from '../../state/todo.actions';
import {ITodo} from '../../resources/models/todo';
import {selectTodos} from "../../state/todo.selectors";

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
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
        }),
        MatMenuModule
      ],
      declarations: [TodoItemComponent],
      providers: [
        {provide: MatDialog, useValue: {}},
        {provide: MatDialogConfig, useValue: {}}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  it('should load todo input', () => {
    expect(component.todo).toEqual(todo);
  });

  it('should dispatch an action to remove todo', () => {
    fixture.ngZone.run(() => {
      const action = TodoActions.removeTodo({id: todo.id});
      store.dispatch(action);
      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
  });

  it('should remove a todo', () => {
    fixture.ngZone.run(() => {
      const addAction = TodoActions.addNewTodoSuccess({todo});
      store.dispatch(addAction);

      const removeAction = TodoActions.removeTodoSuccess({id: todo.id});
      store.dispatch(removeAction);

      const todos$ = store.pipe(select(selectTodos));
      todos$.subscribe(data => {
        expect(data.length).toBe(0);
      });
    });
  });
});
