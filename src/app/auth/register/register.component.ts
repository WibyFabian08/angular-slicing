import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

export interface ValidationResult {
  [key: string]: boolean;
}

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

  handleShowPassword = () => {
    this.isVisible = !this.isVisible
  }

  public static strong(control: FormControl): ValidationResult {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);
    // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
      // return what´s not valid
      return { strong: true };
    }
    return {}
  }

}
