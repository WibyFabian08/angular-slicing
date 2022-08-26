import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailBoardPageComponent } from './detail-board-page/detail-board-page.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "home",
        component: HomePageComponent
      },
      {
        path: "detail/:id",
        component: DetailBoardPageComponent
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
