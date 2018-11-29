import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersWorkersComponent } from './admin-orders-workers.component';

describe('AdminOrdersWorkersComponent', () => {
  let component: AdminOrdersWorkersComponent;
  let fixture: ComponentFixture<AdminOrdersWorkersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersWorkersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
