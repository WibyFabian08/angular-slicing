import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DashboardService } from '../service/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.css']
})
export class AddBoardComponent implements OnInit {
  form = new FormGroup({
    project: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    owner: new FormControl("")
  })
  isLoading: boolean = false

  constructor(private authService: AuthService,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddBoardComponent>
  ) { }

  ngOnInit(): void {
    let data: any = this.authService.getToken()
    let obj = JSON.parse(data)

    this.form.patchValue({
      owner: obj.name
    })
  }

  handleSubmit = () => {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control: any = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true
      this.dashboardService.createBoard(this.form.value)
        .subscribe({
          next: (data) => {
            this.isLoading = false
            window.location.reload()
            this.dialogRef.close()
          },
          error: (err) => {
            console.log(err)
            this.dialogRef.close()
            this.isLoading = false
          }
        })
    }
  }

}
