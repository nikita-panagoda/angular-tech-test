import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TodoListComponent} from './todo-list.component';
import {Store, StoreModule, select} from '@ngrx/store';
import {FilterTodosPipe} from '../resources/pipes/filter-todos.pipe';
import {AppState, reducers} from '../../../store';
import * as TodoActions from '../state/todo.actions';
import * as TodoSelectors from '../state/todo.selectors';
import {selectTodos} from '../state/todo.selectors';
import {ITodo} from '../resources/models/todo';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<AppState>;

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
      declarations: [TodoListComponent, FilterTodosPipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch an action to load todos when created', () => {
    const action = TodoActions.loadTodos();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should display a list of todos after the data is loaded', () => {
    const todos: ITodo[] = [
      {
        id: 1,
        label: 'Kitchen Cleanup',
        description: 'Clean my dirty kitchen',
        category: 'house',
        done: false
      },
      {
        id: 2,
        label: 'Taxesa',
        description: 'Start doing my taxes and contact my accountant jhon for advice',
        category: 'bureaucracy',
        done: '12/18/2022'
      }
    ];

    fixture.ngZone.run(() => {
      const action = TodoActions.loadTodosSuccess({todos});
      store.dispatch(action);

      component.todos$.subscribe(data => {
        expect(data.length).toBe(todos.length);
      });
    });
  });
});

