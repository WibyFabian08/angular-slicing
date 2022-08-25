import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    MatDialogModule,
    MatMenuModule
  ],
  exports: [
    MatDialogModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
