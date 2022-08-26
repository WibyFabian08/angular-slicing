import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBoardPageComponent } from './detail-board-page.component';

describe('DetailBoardPageComponent', () => {
  let component: DetailBoardPageComponent;
  let fixture: ComponentFixture<DetailBoardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBoardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
