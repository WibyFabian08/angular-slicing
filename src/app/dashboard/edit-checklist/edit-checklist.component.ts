import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.css'],
})
export class EditChecklistComponent implements OnInit {
  isLoading: boolean = false;

  form = new FormGroup({
    editForm: new FormControl("", [Validators.required])
  })

  constructor(
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditChecklistComponent>
  ) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      editForm: this.data.data.name
    })
  }

  handleEdit = () => {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control: any = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      this.isLoading = true
      this.dashboardService.getChecklist(this.data.boardId)
        .subscribe({
          next: (data: any) => {
            let checkData = data[0]
            checkData.item.map((data: any) => {
              if (data.name == this.data.data.name) {
                data.name = this.form.value.editForm
              }
            })

            this.dashboardService.updateChelist(checkData, this.data.boardId)
              .subscribe({
                next: () => {
                  this.isLoading = false
                  this.dialogRef.close()
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
    }
  };
}
