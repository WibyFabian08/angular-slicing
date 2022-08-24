import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { SuccessSendEmailPageComponent } from './success-send-email-page/success-send-email-page.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ModalComponentComponent } from './modal-component/modal-component.component';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgotPasswordPageComponent,
    SuccessSendEmailPageComponent,
    ResetPasswordPageComponent,
    ModalComponentComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
