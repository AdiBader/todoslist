import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { LoginComponent } from './login/login.component';
import { TodosPageComponent } from './todos-page/todos-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'todos-page', component: TodosPageComponent },
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
];
