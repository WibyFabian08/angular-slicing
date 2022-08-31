import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/service/auth.service';
import { DashboardService } from '../service/dashboard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {
  form = new FormGroup({
    project: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    owner: new FormControl("")
  })
  isLoading: boolean = false

  constructor(private authService: AuthService,
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<EditBoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.form.patchValue({
      project: data.project,
      description: data.description,
      owner: data.owner,
    })
  }

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
      this.dashboardService.updateBoard(this.form.value, this.data.id)
        .subscribe({
          next: (data) => {
            this.isLoading = false
            // window.location.reload()
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
