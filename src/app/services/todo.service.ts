import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  todosCompleted: Todo[] = [];
  todosUnCompleted: Todo[] = [];
  displayTodos: Todo[];
  newTodo: string;
  displayTodoDone: boolean = true;
  newTodoDate: Date = new Date();
  num: number = 10;
  startIndex: number = 0;
  loogedIn: boolean;
  userDisplay: string;

  constructor(private route: Router) {
    // this.loogedIn = false;
    this.setTodos();
  }

  setTodos(): void {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((data) => data.json())
      .then((res) =>
        res.forEach((element: any) => {
          this.todos.push(element);
        })
      )
      .then(() => this.setDisplayTodos());
  }
  setDisplayTodos() {
    this.todosCompleted = this.todos.filter((todo) => todo.completed === true);
    this.todosUnCompleted = this.todos.filter(
      (todo) => todo.completed === false
    );
    if (this.displayTodoDone === true) {
      this.displayTodos = this.todos.slice(
        this.startIndex,
        this.startIndex + this.num
      );
    } else if (this.displayTodoDone === false) {
      this.displayTodos = this.todosUnCompleted.slice(
        this.startIndex,
        this.startIndex + this.num
      );
    }
  }

  todosNum(number: number) {
    this.num = number;
    this.setDisplayTodos();
  }

  todoDone() {
    this.displayTodoDone = !this.displayTodoDone;
    if (this.displayTodoDone === false) this.startIndex = 0;

    this.setDisplayTodos();
  }

  navigateTodos(dir: string) {
    if (
      dir === 'fw' &&
      this.displayTodoDone === true &&
      this.startIndex + this.num < this.todos.length
    ) {
      this.startIndex += this.num;
    } else if (
      dir === 'fw' &&
      this.displayTodoDone === false &&
      this.startIndex + this.num < this.todosUnCompleted.length
    ) {
      this.startIndex += this.num;
    } else if (dir === 'rw' && this.startIndex - this.num >= 0) {
      this.startIndex -= this.num;
    } else if (dir === 'rw' && this.startIndex - this.num < 0) {
      this.startIndex = 0;
    }

    this.setDisplayTodos();
  }

  done(todo: Todo) {
    todo.completed = !todo.completed;
    this.setDisplayTodos();
  }

  remove(todoToRemove: Todo) {
    this.todos = this.todos.filter((todo) => todo !== todoToRemove);
    this.setDisplayTodos();
  }
}
