import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PypDepartmentComponent } from './pyp-department.component';

describe('PypDepartmentComponent', () => {
  let component: PypDepartmentComponent;
  let fixture: ComponentFixture<PypDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PypDepartmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PypDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
