import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, MessageModule],
  declarations: [
    LoginComponent
  ],
})
export class UsersModule {}
