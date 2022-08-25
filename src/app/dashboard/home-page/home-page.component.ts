import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/service/auth.service';
import { AddBoardComponent } from '../add-board/add-board.component';
import { Board } from '../interface/board';
import { DashboardService } from '../service/dashboard.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { EditBoardComponent } from '../edit-board/edit-board.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  boards: Board[] = []
  isLoadingFetch: boolean = false

  constructor(public dialog: MatDialog,
    private authService: AuthService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    let data: any = this.authService.getToken()
    let obj = JSON.parse(data)

    this.isLoadingFetch = true
    this.dashboardService.getBoards(obj.name)
      .subscribe({
        next: (data: any) => {
          this.boards = data
          this.isLoadingFetch = false
        },
        error: (err) => {
          console.log(data)
          this.isLoadingFetch = false
        }
      })
  }

  openDialog() {
    this.dialog.open(AddBoardComponent, {
    });
  }

  openEditDialog(data: any) {
    this.dialog.open(EditBoardComponent, {
      data: data
    });
  }

  deleteBoard = (id: any) => {
    this.dashboardService.delete(id)
      .subscribe({
        next: () => {
          let data: any = this.authService.getToken()
          let obj = JSON.parse(data)

          this.isLoadingFetch = true
          this.dashboardService.getBoards(obj.name)
            .subscribe({
              next: (data: any) => {
                this.boards = data
                this.isLoadingFetch = false
              },
              error: (err) => {
                console.log(data)
                this.isLoadingFetch = false
              }
            })
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

}
