import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-add-card-item',
  templateUrl: './add-card-item.component.html',
  styleUrls: ['./add-card-item.component.css']
})
export class AddCardItemComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required])
  })
  title: string = ""
  description: string = ""
  isLoading: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddCardItemComponent>,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  handleAdd = () => {
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
            let newCard = {
              title: this.form.value.title,
              description: this.form.value.description
            }
            let newData = data[0]
            newData.item.map((item: any) => {
              if (item.name == this.data.data) {
                item.data.push(newCard)
              }
            })

            this.dashboardService.addCardItem(newData, this.data.boardId)
              .subscribe({
                next: () => {
                  this.isLoading = false
                  this.dialogRef.close()
                  // window.location.reload()
                }, error: () => {
                  this.isLoading = false
                  this.dialogRef.close()
                }
              })

            // console.log(newData)
          },
          error: (err) => {
            console.log(err)
          }
        })
    }
  }

}
