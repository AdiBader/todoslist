import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from '../../models/Todo';
import {
  faEye,
  faEyeSlash,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  group,
} from '@angular/animations';
import { first } from 'rxjs';

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
})
export class TodosPageComponent implements OnInit {
  eyeIcon = faEye;
  eyeSlashIcon = faEyeSlash;
  trashCan = faTrashCan;

  constructor(private route: Router, public todoService: TodoService) {
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

  remove(index: number) {
    this.todoService.todos.splice(index, 1);

    this.todoService.setDisplayTodos();
  }

  ngOnInit(): void {
    if (this.todoService.firstBuild) {
      this.todoService.setTodos();
      this.todoService.firstBuild = false;
    }
  }
}
