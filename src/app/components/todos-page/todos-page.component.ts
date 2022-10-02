import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  todos: Todo[] = [];
  displayTodos: Todo[];
  newTodo: string;
  num: number = 10;
  startIndex: number = 0;
  loogedIn: boolean;
  userDisplay: string;

  constructor(private route: Router) {
    this.userDisplay = history.state.userdisplay;
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
      )
      .then(() =>
        this.setDisplayTodos(this.startIndex, this.startIndex + this.num)
      );
  }
  setDisplayTodos(start: number, end: number) {
    this.displayTodos = this.todos.slice(start, end);
  }

  todosNum(number: number) {
    this.num = number;
    this.setDisplayTodos(this.startIndex, this.startIndex + this.num);
  }

  navigateTodos(dir: string) {
    if (dir === 'fw' && this.startIndex + this.num < this.todos.length) {
      this.startIndex += this.num;
    } else if (dir === 'rw' && this.startIndex - this.num >= 0) {
      this.startIndex -= this.num;
    } else if (dir === 'rw' && this.startIndex - this.num < 0) {
      this.startIndex = 0;
    }

    this.setDisplayTodos(this.startIndex, this.startIndex + this.num);
  }

  saveTodo() {
    if (this.newTodo) {
      let todo = new Todo();
      todo.title = this.newTodo;
      todo.completed = true;
      todo.id = this.todos.length + 1;
      this.todos.unshift(todo);
      this.newTodo = '';
      this.setDisplayTodos(this.startIndex, this.startIndex + this.num);
    } else {
      alert('Please Enter todo');
    }
  }

  done(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
  }

  remove(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.setDisplayTodos(this.startIndex, this.startIndex + this.num);
  }

  ngOnInit(): void {}
}
