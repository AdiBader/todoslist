import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { LoginComponent } from './login/login.component';
import { TodosPageComponent } from './todos-page/todos-page.component';
import { Login2Component } from './login2/login2.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'todos-page', component: TodosPageComponent },
  { path: 'login2', component: Login2Component },
  { path: '*', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  LoginComponent,
  TodosPageComponent,
  AddTodoComponent,
  Login2Component,
];
