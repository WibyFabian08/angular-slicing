import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { SuccessSendEmailPageComponent } from './success-send-email-page/success-send-email-page.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "forgot-password",
        component: ForgotPasswordPageComponent
      },
      {
        path: "confirm",
        component: SuccessSendEmailPageComponent
      },
      {
        path: "reset-password",
        component: ResetPasswordPageComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "login"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
