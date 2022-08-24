import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
  })
  isLoading: boolean = false
  isMatch: boolean = true

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  handleSubmit = () => {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control: any = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true
      this.authService.checkEmail(this.form.value.email)
        .subscribe({
          next: (data: any) => {
            if (data.length > 0) {
              this.isMatch = true
            } else {
              this.isMatch = false
            }
            this.isLoading = false
          },
          error: (err) => {
            console.log(err)
            this.isLoading = false
          }
        })
    }
  }
}
