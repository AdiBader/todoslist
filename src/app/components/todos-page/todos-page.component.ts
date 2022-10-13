import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../models/Todo';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  // todos: Todo[] = [];
  // displayTodos: Todo[];
  // newTodo: string;
  // num: number = 10;
  // startIndex: number = 0;
  // loogedIn: boolean;
  // userDisplay: string;
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;

  constructor(private route: Router, public todoService: TodoService) {
    // this.userDisplay = history.state.userdisplay;
    // this.loogedIn = history.state.data;
    if (todoService.logedIn !== true) {
      this.route.navigate(['/login']);
    }
  }

  addTodoPage() {
    this.route.navigate(['/add-todo']);
  }

  todosNum(number: number) {
    this.todoService.num = number;
    this.todoService.setDisplayTodos();
  }

  navigateTodos(dir: string) {
    if (
      dir === 'fw' &&
      this.todoService.displayTodoDone === true &&
      this.todoService.startIndex + this.todoService.num <
        this.todoService.todos.length
    ) {
      this.todoService.startIndex += this.todoService.num;
    } else if (
      dir === 'fw' &&
      this.todoService.displayTodoDone === false &&
      this.todoService.startIndex + this.todoService.num <
        this.todoService.todosUnCompleted.length
    ) {
      this.todoService.startIndex += this.todoService.num;
    } else if (
      dir === 'rw' &&
      this.todoService.startIndex - this.todoService.num >= 0
    ) {
      this.todoService.startIndex -= this.todoService.num;
    } else if (
      dir === 'rw' &&
      this.todoService.startIndex - this.todoService.num < 0
    ) {
      this.todoService.startIndex = 0;
    }

    this.todoService.setDisplayTodos();
  }

  done(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.setDisplayTodos();
  }

  remove(todoToRemove: Todo) {
    this.todoService.todos = this.todoService.todos.filter(
      (todo) => todo !== todoToRemove
    );
    this.todoService.setDisplayTodos();
  }

  ngOnInit(): void {}
}
