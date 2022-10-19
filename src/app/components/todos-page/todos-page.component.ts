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

@Component({
  selector: 'app-todos-page',
  templateUrl: './todos-page.component.html',
  styleUrls: ['./todos-page.component.scss'],
  animations: [
    trigger('fade', [
      // transition(':enter', [
      //   style({ opacity: 0, height: 0, fontSize: 0 }),
      //   animate(200, style({ opacity: 1, height: 'auto', fontSize: 'auto' })),
      // ]),
      transition(':leave', [
        style({ opacity: 1, height: 'auto', fontSize: 'auto' }),
        animate(
          '100ms ease-out',
          style({ opacity: 0, height: 0, fontSize: 0, boxShadow: 'none' })
        ),
      ]),
    ]),
  ],
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

  remove(todoToRemove: Todo) {
    this.todoService.todos = this.todoService.todos.filter(
      (todo) => todo !== todoToRemove
    );
    this.todoService.setDisplayTodos();
  }

  ngOnInit(): void {}
}
