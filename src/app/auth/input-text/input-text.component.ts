import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  @Input() placeholderText = ''
  @Input() formControlName: any = ""

  constructor() { }

  ngOnInit(): void {
    console.log(this.formControlName)
  }

}
