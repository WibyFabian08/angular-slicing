import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl("", [ Validators.required]),
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
    console.log(this.registerForm.value)
  }

  handleShowPassword = () => {
    this.isVisible = !this.isVisible
  }

}
