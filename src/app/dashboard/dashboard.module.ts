import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddBoardComponent } from './add-board/add-board.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditBoardComponent } from './edit-board/edit-board.component';
import { DetailBoardPageComponent } from './detail-board-page/detail-board-page.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddChecklistComponent } from './add-checklist/add-checklist.component';
import { EditChecklistComponent } from './edit-checklist/edit-checklist.component';
import { AddCardItemComponent } from './add-card-item/add-card-item.component';
import { EditCardItemComponent } from './edit-card-item/edit-card-item.component';
import { DetailItemCardComponent } from './detail-item-card/detail-item-card.component';

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
    DragDropModule
  ]
})
export class DashboardModule { }
