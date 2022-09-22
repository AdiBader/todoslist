import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import { Todo } from '../Todo';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string;
  num: number = 10;
  loogedIn: boolean;

  constructor(private route: Router) {
    this.loogedIn = history.state.data;
    if (this.loogedIn !== true) {
      this.route.navigate(['/login']);
    }
    this.setTodos();
  }

  setTodos(): void {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((data) => data.json())
      .then((res) =>
        res.forEach((element: any) => {
          this.todos.push(element);
        })
      );
  }
  todosNum(number = 5) {
    this.num = number;
  }

  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.title = this.newTodo;
      todo.completed = true;
      this.todos.unshift(todo);
      this.newTodo = '';
    } else {
      alert('Please Enter todo');
    }
  }

  done(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
  }

  remove(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
  }

  ngOnInit(): void {}
}
