import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: Users[] = [];

  checkError: boolean = false;
  checkCredentials: boolean = false;
  loginForm: FormGroup;

  constructor(private route: Router, public todoService: TodoService) {
    this.loginForm = new FormGroup({
      emailInput: new FormControl('', [Validators.required, Validators.email]),
      usernameInput: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  ngOnInit(): void {}

  loginUser() {
    if (
      !this.loginForm.controls['emailInput'].errors &&
      !this.loginForm.controls['usernameInput'].errors
    ) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((data) => data.json())
        .then((res) => {
          res.forEach((element: any) => {
            this.users.push(element);
          });
          const userName = String(
            this.loginForm.value.usernameInput
          ).toLowerCase();
          const eMail = String(this.loginForm.value.emailInput).toLowerCase();
          this.users.forEach((user: any) => {
            if (
              userName === user.username.toLowerCase() &&
              eMail === user.email.toLowerCase()
            ) {
              this.todoService.logedIn = true;
              this.todoService.userDisplay = user.username;

              this.route.navigate(['/todos-page']);
            } else {
              this.checkCredentials = true;
            }
          });
        });
    } else {
      this.checkError = true;
    }
  }
}
