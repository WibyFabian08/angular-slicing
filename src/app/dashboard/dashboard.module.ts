import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddBoardComponent } from './add-board/add-board.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditBoardComponent } from './edit-board/edit-board.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomePageComponent,
    AddBoardComponent,
    EditBoardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class DashboardModule { }
