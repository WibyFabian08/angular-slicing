import { NgModule, Provider } from '@angular/core';
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
import { InputTextComponent } from './input-text/input-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMatErrorsModule,
  NGX_MAT_ERROR_DEFAULT_OPTIONS,
  DEFAULT_ERROR_MESSAGES,
  MinError,
} from 'ngx-mat-errors';

export const NGX_MAT_ERROR_DEFAULT_CONFIG: Provider = {
  useFactory: () => {
    return {
      ...DEFAULT_ERROR_MESSAGES,
      min: (error: MinError) =>
        `Min value is ${error.min}, actual is ${error.actual}`,
    };
  },
  provide: NGX_MAT_ERROR_DEFAULT_OPTIONS,
};

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    ForgotPasswordPageComponent,
    SuccessSendEmailPageComponent,
    ResetPasswordPageComponent,
    ModalComponentComponent,
    InputTextComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatErrorsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [NGX_MAT_ERROR_DEFAULT_CONFIG],
})
export class AuthModule { }
