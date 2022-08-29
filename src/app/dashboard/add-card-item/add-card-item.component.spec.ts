import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardItemComponent } from './add-card-item.component';

describe('AddCardItemComponent', () => {
  let component: AddCardItemComponent;
  let fixture: ComponentFixture<AddCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
