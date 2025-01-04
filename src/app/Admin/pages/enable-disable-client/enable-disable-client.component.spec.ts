import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableDisableClientComponent } from './enable-disable-client.component';

describe('EnableDisableClientComponent', () => {
  let component: EnableDisableClientComponent;
  let fixture: ComponentFixture<EnableDisableClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnableDisableClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableDisableClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
