import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [Validators.required]),
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

}
