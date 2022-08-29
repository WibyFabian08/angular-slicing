import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCardItemComponent } from './edit-card-item.component';

describe('EditCardItemComponent', () => {
  let component: EditCardItemComponent;
  let fixture: ComponentFixture<EditCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
