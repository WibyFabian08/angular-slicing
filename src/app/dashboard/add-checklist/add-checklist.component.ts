import { Component, OnInit, Inject } from '@angular/core';
import { DashboardService } from '../service/dashboard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.css']
})
export class AddChecklistComponent implements OnInit {
  checklist = ""
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
          } else {
            // this.dataCheklist = {
            //   boardId: undefined,
            //   boardName: '',
            //   id: 1,
            //   item: [{}],
            // };
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  createNew = () => {

  }

  handleAdd = () => {
    if (this.checklist.length < 2) {
      alert('Fill input form')
    } else {
      if (this.dataCheklist) {
        this.isLoading = true
        let newCheklist = {
          name: this.checklist,
          data: [" "]
        }

        this.dataCheklist.item.push(newCheklist)

        this.dashboardService.addCheklist(this.dataCheklist, this.data)
          .subscribe({
            next: () => {
              this.isLoading = false
              this.dialogRef.close()
              window.location.reload()
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
            name: this.checklist,
            data: [
              " "
            ]
          },],
          boardId: this.data
        }

        this.dashboardService.createChecklist(newCheklist)
          .subscribe({
            next: () => {
              this.isLoading = false
              this.dialogRef.close()
              window.location.reload()
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
