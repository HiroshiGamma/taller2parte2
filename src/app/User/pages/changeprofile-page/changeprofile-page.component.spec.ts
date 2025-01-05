import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeprofilePageComponent } from './changeprofile-page.component';

describe('ChangeprofilePageComponent', () => {
  let component: ChangeprofilePageComponent;
  let fixture: ComponentFixture<ChangeprofilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeprofilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
