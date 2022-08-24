import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ValidationResult } from '../interfaces/validationInterface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required, RegisterComponent.strong]),
  })
  isVisible: boolean = true
  eyeIcon: string = "../../../assets//icons/eye.png"
  closeIcon: string = "../../../assets//icons/hide.png"
  isLoading: boolean = false

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleSubmit = () => {
    if (this.registerForm.invalid) {
      Object.keys(this.registerForm.controls).forEach(field => {
        const control: any = this.registerForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true
      this.authService.register(this.registerForm.value)
        .subscribe({
          next: (data) => {
            alert("Register Sukses")
            this.isLoading = false
          },
          error: (err) => {
            console.log(err)
            this.isLoading = false
          }
        })
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

}
