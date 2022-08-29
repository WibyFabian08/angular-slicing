import { Component, OnInit, Inject } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.css']
})
export class AddChecklistComponent implements OnInit {
  form = new FormGroup({
    checklist: new FormControl("", [Validators.required])
  })
  dataCheklist: any
  isLoading: boolean = false

  constructor(
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.checkData()
  }

  checkData = () => {
    this.dashboardService.getChecklist(this.data)
      .subscribe({
        next: (data: any) => {
          if (data.length > 0) {
            this.dataCheklist = data[0]
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  handleAdd = () => {
    console.log(this.form.value.checklist)
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(field => {
        const control: any = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    } else {
      if (this.dataCheklist) {
        this.isLoading = true
        let newCheklist = {
          name: this.form.value.checklist,
          data: [
            {
              title: " ",
              description: " "
            }
          ]
        }

        this.dataCheklist.item.push(newCheklist)

        this.dashboardService.addCheklist(this.dataCheklist, this.data)
          .subscribe({
            next: () => {
              this.isLoading = false
              this.dialogRef.close()
            },
            error: (err) => {
              this.isLoading = false
              this.dialogRef.close()
            }
          })
      } else {
        this.isLoading = true
        let newCheklist = {
          item: [{
            name: this.form.value.checklist,
            data: [
              {
                title: " ",
                description: " "
              }
            ]
          },],
          boardId: this.data
        }

        this.dashboardService.createChecklist(newCheklist)
          .subscribe({
            next: () => {
              this.isLoading = false
              this.dialogRef.close()
              // window.location.reload()
            },
            error: (err) => {
              this.isLoading = false
              this.dialogRef.close()
            }
          })

      }
    }
  }



}
