import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  loogedIn: boolean;
  checkError: boolean;
  addTodoForm: FormGroup;

  constructor(private route: Router, public todoService: TodoService) {
    if (todoService.loogedIn !== true) {
      this.route.navigate(['/login']);
    }
    this.addTodoForm = new FormGroup({
      dateInput: new FormControl('', [Validators.required]),
      todoInput: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }
  saveTodo() {
    if (
      this.addTodoForm.value.todoInput &&
      this.addTodoForm.value.dateInput &&
      !this.addTodoForm.controls['todoInput'].errors &&
      !this.addTodoForm.controls['dateInput'].errors
    ) {
      let todo = new Todo();
      todo.title = this.addTodoForm.value.todoInput;
      todo.completed = false;
      todo.id = this.todoService.todos.length + 1;
      todo.date = this.addTodoForm.value.dateInput;
      console.log(todo.date);
      this.todoService.todos.unshift(todo);
      this.addTodoForm.value.todoInput = '';
      this.addTodoForm.value.dateInput = new Date();
      this.todoService.setDisplayTodos();
      this.route.navigate(['/todos-page']);
    } else {
      this.checkError = true;
    }
  }
  ngOnInit(): void {}
}
