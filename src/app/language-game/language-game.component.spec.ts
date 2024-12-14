import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageGameComponent } from './language-game.component';

describe('LanguageGameComponent', () => {
  let component: LanguageGameComponent;
  let fixture: ComponentFixture<LanguageGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
