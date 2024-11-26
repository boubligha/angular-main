import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModefierPasswdComponent } from './modefier-passwd.component';

describe('ModefierPasswdComponent', () => {
  let component: ModefierPasswdComponent;
  let fixture: ComponentFixture<ModefierPasswdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModefierPasswdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModefierPasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
