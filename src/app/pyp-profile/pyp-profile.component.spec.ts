import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PypProfileComponent } from './pyp-profile.component';

describe('PypProfileComponent', () => {
  let component: PypProfileComponent;
  let fixture: ComponentFixture<PypProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PypProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PypProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
