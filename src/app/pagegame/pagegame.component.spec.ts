import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagegameComponent } from './pagegame.component';

describe('PagegameComponent', () => {
  let component: PagegameComponent;
  let fixture: ComponentFixture<PagegameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagegameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
