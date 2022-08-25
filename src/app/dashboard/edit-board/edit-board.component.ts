import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    project: new FormControl(""),
    description: new FormControl(""),
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
    this.isLoading = true
    this.dashboardService.updateBoard(this.form.value, this.data.id)
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
