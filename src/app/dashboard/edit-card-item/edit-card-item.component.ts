import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../service/dashboard.service';


@Component({
  selector: 'app-edit-card-item',
  templateUrl: './edit-card-item.component.html',
  styleUrls: ['./edit-card-item.component.css']
})
export class EditCardItemComponent implements OnInit {
  isLoading: boolean = false
  bufferData: any | undefined
  dataChecklist: any = []

  constructor(
    public dialogRef: MatDialogRef<EditCardItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dashboardService: DashboardService
  ) {
    this.bufferData = this.data.data.title
  }

  ngOnInit(): void {
    this.dashboardService.getChecklist(this.data.boardId)
      .subscribe({
        next: (data: any) => {
          this.dataChecklist = data[0]
        }
      })
  }

  handleSubmit = () => {

    this.isLoading = true
    this.dataChecklist.item.map((data: any) => {
      if (data.name == this.data.parentData.name) {
        data.data = this.data.parentData.data
      }
    })

    this.dashboardService.deleteCheklist(this.dataChecklist, this.data.boardId)
      .subscribe({
        next: () => {
          this.isLoading = false
          this.dialogRef.close()
          // window.location.reload()
        },
        error: (err) => {
          this.isLoading = false
          this.dialogRef.close()
          console.log(err)
        }
      })
  }

}
