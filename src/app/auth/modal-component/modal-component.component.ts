import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.css']
})
export class ModalComponentComponent implements OnInit {
  isLoading: boolean = false

  constructor(
    public dialogRef: MatDialogRef<ModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  ngOnInit(): void {
  }

  close = () => {
    this.dialogRef.close()
  }

  handleSubmit = () => {
    console.log(this.data)
  }

}
