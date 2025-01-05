import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordPageComponent } from './changepassword-page.component';

describe('ChangepasswordPageComponent', () => {
  let component: ChangepasswordPageComponent;
  let fixture: ComponentFixture<ChangepasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangepasswordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangepasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
