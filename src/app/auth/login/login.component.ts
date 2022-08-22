import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  isVisible: boolean = false
  eyeIcon: string = "../../../assets//icons/eye.png"
  closeIcon: string = "../../../assets//icons/hide.png"

  constructor() { }

  ngOnInit(): void {
  }

  handleSubmit = () => {
    console.log(this.loginForm.value)
  }

  handleShowPassword = () => {
    this.isVisible = !this.isVisible
  }

}
