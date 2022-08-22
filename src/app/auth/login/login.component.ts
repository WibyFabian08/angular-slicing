import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
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
    this.authService.login(this.loginForm.value.email)
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            if (data[0].password === this.loginForm.value.password) {
              this.isLoading = false
              // this.loginForm.patchValue({
              //   email: "",
              //   password: ""
              // })
              alert("Login Sukses")
            } else {
              alert("Password Salah")
              this.isLoading = false
            }
          } else {
            alert("Akun Tidak Ditemukan")
            this.isLoading = false
          }
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
