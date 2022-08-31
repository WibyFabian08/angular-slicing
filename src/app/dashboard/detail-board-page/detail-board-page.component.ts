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
import { EditCardItemComponent } from '../edit-card-item/edit-card-item.component';
import { DetailItemCardComponent } from '../detail-item-card/detail-item-card.component';

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

  handleDeleteCard = (data: any, item: any) => {
    let findData = data.data.filter((value: any) => {
      return value.title !== item.title
    })

    this.dataChecklist.item.filter((item: any) => {
      if (item.name === data.name) {
        item.data = findData
      }
    })

    this.dashboardService.deleteCheklist(this.dataChecklist, this.boardId)
      .subscribe({
        next: () => {
          this.getData()
        },
        error: (err) => {
          console.log(err)
        }
      })
  }

  openDialog() {
    this.dialog.open(AddChecklistComponent, {
      data: this.boardId
    }).afterClosed().subscribe({
      next: () => {
        this.getData()
      }
    })
  }

  openEditDialog(data: any) {
    this.dialog.open(EditChecklistComponent, {
      data: {
        data: data,
        boardId: this.boardId
      }
    }).afterClosed().subscribe({
      next: () => {
        this.getData()
      }
    })
  }

  openEditCardItemDialog(data: any, parentData: any) {
    this.dialog.open(EditCardItemComponent, {
      data: {
        data: data,
        parentData: parentData,
        boardId: this.boardId
      }
    }).afterClosed().subscribe({
      next: () => {
        this.getData()
      }
    })
  }

  openAddCardDialog(data: any) {
    this.dialog.open(AddCardItemComponent, {
      data: {
        boardId: this.boardId,
        data: data.name
      }
    }).afterClosed().subscribe({
      next: () => {
        this.getData()
      }
    })
  }

  openDetailCardItem(data: any) {
    this.dialog.open(DetailItemCardComponent, {
      data: data
    });
  }
}
