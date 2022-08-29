import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemCardComponent } from './detail-item-card.component';

describe('DetailItemCardComponent', () => {
  let component: DetailItemCardComponent;
  let fixture: ComponentFixture<DetailItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
