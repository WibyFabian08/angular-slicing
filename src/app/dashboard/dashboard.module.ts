import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddBoardComponent } from './add-board/add-board.component';
import { MatMenuModule } from '@angular/material/menu';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { DetailBoardPageComponent } from './detail-board-page/detail-board-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddChecklistComponent } from './add-checklist/add-checklist.component';
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component';
import { AddCardItemComponent } from './add-card-item/add-card-item.component';
import { EditCardItemComponent } from './edit-card-item/edit-card-item.component';
import { DetailItemCardComponent } from './detail-item-card/detail-item-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  NgxMatErrorsModule,
  NGX_MAT_ERROR_DEFAULT_OPTIONS,
  DEFAULT_ERROR_MESSAGES,
  MinError,
} from 'ngx-mat-errors';

export const NGX_MAT_ERROR_DEFAULT_CONFIG: Provider = {
  useFactory: () => {
    return {
      ...DEFAULT_ERROR_MESSAGES,
      min: (error: MinError) =>
        `Min value is ${error.min}, actual is ${error.actual}`,
    };
  },
  provide: NGX_MAT_ERROR_DEFAULT_OPTIONS,
};

@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    AddBoardComponent,
    EditBoardComponent,
    DetailBoardPageComponent,
    AddChecklistComponent,
    EditChecklistComponent,
    AddCardItemComponent,
    EditCardItemComponent,
    DetailItemCardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatErrorsModule
  ],
  providers: [NGX_MAT_ERROR_DEFAULT_CONFIG],
})
export class DashboardModule { }
