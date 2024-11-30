import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivationDialogComponent } from './motivation-dialog.component';

describe('MotivationDialogComponent', () => {
  let component: MotivationDialogComponent;
  let fixture: ComponentFixture<MotivationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotivationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
