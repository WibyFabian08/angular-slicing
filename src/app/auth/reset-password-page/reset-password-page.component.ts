import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ValidationResult } from '../interfaces/validationInterface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponentComponent } from '../modal-component/modal-component.component';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  form = new FormGroup({
    newPassword: new FormControl("", [Validators.required, ResetPasswordPageComponent.strong]),
    confirmNewPassword: new FormControl("", [Validators.required, ResetPasswordPageComponent.strong]),
  })
  isVisible: boolean = true
  eyeIcon: string = "../../../assets/icons/eye.png"
  closeIcon: string = "../../../assets/icons/hide.png"
  isLoading: boolean = false

  constructor(private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  handleSubmit = () => {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control: any = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.openDialog()
    }
  }

  handleShowPassword = () => {
    this.isVisible = !this.isVisible
  }

  public static strong(control: FormControl): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    let hasSymbl = /[?=.*?[#?!@$%^&*-]/.test(control.value)
    const valid = hasNumber && hasUpper && hasLower && hasSymbl;
    if (!valid) {
      return { strong: true };
    }
    return {}
  }

  openDialog() {
    this.dialog.open(ModalComponentComponent, {
      data: {
        form: this.form.value
      },
      panelClass: 'custom-dialog'
    });
  }

}
