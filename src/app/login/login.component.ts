import { Component, OnInit } from '@angular/core';
import { Users } from '../Users';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: Users[] = [];
  loogedIn: boolean;
  checkError: boolean;
  loginForm: FormGroup;
  userDisplay: string;

  constructor(private route: Router) {
    this.loogedIn = false;

    this.loginForm = new FormGroup({
      emailInput: new FormControl('', [Validators.required, Validators.email]),
      usernameInput: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
    console.log(this.loginForm);
  }

  ngOnInit(): void {}

  loginUser() {
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
            console.log('welcome');
            this.loogedIn = true;
            this.userDisplay = user.username;

            this.route.navigate(['/todos-page'], {
              state: { data: this.loogedIn, userdisplay: this.userDisplay },
            });
          } else {
            this.checkError = true;
          }
        });
      });

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    }
  }
}
