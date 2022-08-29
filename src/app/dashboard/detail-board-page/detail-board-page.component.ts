import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddChecklistComponent } from '../add-checklist/add-checklist.component';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../service/dashboard.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { EditChecklistComponent } from '../edit-checklist/edit-checklist.component';
import { AddCardItemComponent } from '../add-card-item/add-card-item.component';

@Component({
  selector: 'app-detail-board-page',
  templateUrl: './detail-board-page.component.html',
  styleUrls: ['./detail-board-page.component.css'],
})
export class DetailBoardPageComponent implements OnInit {
  checklist = [
    {
      name: 'Todo',
      data: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'],
    },
    {
      name: 'Progress',
      data: ['up', 'on', 'at', 'off'],
    },
    {
      name: 'Done',
      data: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail'],
    },
  ];

  dataChecklist = {
    boardId: undefined,
    boardName: '',
    id: 1,
    item: [{}],
  };
  bufferChecklist: Array<any> = [];
  boardId: number | undefined;

  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.boardId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.getData()
  }

  dropCheklist(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.bufferChecklist,
      event.previousIndex,
      event.currentIndex
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.dataChecklist.item = this.bufferChecklist;

    this.dashboardService
      .updateChecklistItemPosition(this.boardId, this.dataChecklist)
      .subscribe({
        next: () => { },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getData = () => {
    this.dashboardService.getChecklist(this.boardId).subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.dataChecklist = data[0];
          this.bufferChecklist = data[0].item;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  handleDelete = (data: any) => {
    let newData = this.dataChecklist.item.filter((item: any) => {
      return item.name !== data.name
    })

    this.dataChecklist.item = newData

    this.dashboardService.deleteCheklist(this.dataChecklist, this.boardId)
      .subscribe({
        next: () => {
          this.getData()
        },
        error: (err) => {
          console.log(err)
        }
      })
  };

  openDialog() {
    this.dialog.open(AddChecklistComponent, {
      data: this.boardId
    });
  }

  openEditDialog(data: any) {
    this.dialog.open(EditChecklistComponent, {
      data: {
        data: data,
        boardId: this.boardId
      }
    });
  }

  openAddCardDialog(data: any) {
    this.dialog.open(AddCardItemComponent, {
      data: {
        boardId: this.boardId,
        data: data.name
      }
    });
  }
}
