import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSendEmailPageComponent } from './success-send-email-page.component';

describe('SuccessSendEmailPageComponent', () => {
  let component: SuccessSendEmailPageComponent;
  let fixture: ComponentFixture<SuccessSendEmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSendEmailPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessSendEmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
