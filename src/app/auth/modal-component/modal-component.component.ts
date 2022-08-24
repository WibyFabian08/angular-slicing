import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {
  isLoading: boolean = false
  isSuccess: boolean = false
  title: string = "Reset Password?"
  subTitle: string = "Password will be resetted"

  constructor(
    public dialogRef: MatDialogRef<ModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close()
  }

  back = () => {
    this.close()
    this.router.navigate(["/auth/login"])
  }

  handleSubmit = () => {
    let data: any = this.authService.getToken()
    let obj = JSON.parse(data)

    obj.password = this.data.form.newPassword

    this.isLoading = true
    this.authService.updatePassword(obj, obj.id)
      .subscribe({
        next: (data) => {
          this.isSuccess = true
          this.title = "Success!"
          this.subTitle = "Password has been resetted"
          this.isLoading = false
        },
        error: (err) => {
          this.isLoading = false
          console.log(err)
        }
      })
  }

}
