import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPYPComponent } from './manual-pyp.component';

describe('ManualPYPComponent', () => {
  let component: ManualPYPComponent;
  let fixture: ComponentFixture<ManualPYPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManualPYPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualPYPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
