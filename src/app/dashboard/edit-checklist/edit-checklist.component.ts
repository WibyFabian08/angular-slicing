import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.css'],
})
export class EditChecklistComponent implements OnInit {
  isLoading: boolean = false;
  editForm: string = '';

  constructor(
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditChecklistComponent>
  ) {
  }

  ngOnInit(): void {
    this.editForm = this.data.data.name;
  }

  handleEdit = () => {
    this.isLoading = true
    this.dashboardService.getChecklist(this.data.boardId)
      .subscribe({
        next: (data: any) => {
          let checkData = data[0]
          checkData.item.map((data: any) => {
            if (data.name == this.data.data.name) {
              data.name = this.editForm
            }
          })

          this.dashboardService.updateChelist(checkData, this.data.boardId)
            .subscribe({
              next: () => {
                this.isLoading = false
                this.dialogRef.close()
                window.location.reload()
              },
              error: () => {
                this.isLoading = false
                this.dialogRef.close()
              }
            })

        },
        error: (err) => {
          console.log(err)
        }
      })

    // console.log(this.data);
    // this.dashboardService.updateChelist(this.data.data, this.data.boardId)
    //   .subscribe({
    //     next: () => {
    //       this.isLoading = false
    //       this.dialogRef.close()
    //       window.location.reload()
    //     },
    //     error: (err) => {
    //       this.isLoading = false
    //       this.dialogRef.close()
    //       console.log(err)
    //     }
    //   })
  };
}
