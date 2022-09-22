import { Component, OnInit } from '@angular/core';
import { Users } from '../Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usernameInput: string;
  emailInput: string;
  users: Users[] = [];
  loogedIn: boolean;
  checkError: boolean;
  checkMailError: boolean;
  checkUserNameError: boolean;

  constructor(private route: Router) {
    this.loogedIn = false;
    this.checkError = false;
    this.checkMailError = false;
    this.checkUserNameError = false;
  }

  ngOnInit(): void {}

  loginUser() {
    if (this.emailInput === undefined || this.emailInput === '') {
      this.checkMailError = true;
    } else {
      this.checkMailError = false;
    }
    if (this.usernameInput === undefined || this.usernameInput === '') {
      this.checkUserNameError = true;
    } else {
      this.checkUserNameError = false;
    }

    fetch('http://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((res) => {
        res.forEach((element: any) => {
          this.users.push(element);
        });

        this.users.forEach((user: any) => {
          const userName = String(this.usernameInput).toLowerCase();
          const eMail = String(this.emailInput).toLowerCase();
          if (
            userName === user.username.toLowerCase() &&
            eMail === user.email.toLowerCase()
          ) {
            console.log('welcome');
            this.loogedIn = true;
            this.route.navigate(['/todos-page'], {
              state: { data: this.loogedIn },
            });
          } else {
            this.checkError = true;
          }
        });
      });
  }
}
