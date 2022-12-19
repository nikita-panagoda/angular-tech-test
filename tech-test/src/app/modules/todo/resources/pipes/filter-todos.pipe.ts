import {Pipe, PipeTransform} from '@angular/core';
import {ITodo} from '../models/todo';

@Pipe({
  name: 'filterTodos'
})
export class FilterTodosPipe implements PipeTransform {

  transform(todos: ITodo[], filter: string): ITodo[] {
    const value = filter.toLowerCase();
    return todos.filter(t => {
      return t.label.toLowerCase().includes(value) ||
        t.description.toLowerCase().includes(value) ||
        t.category.toLowerCase().includes(value);
    });
  }

}
