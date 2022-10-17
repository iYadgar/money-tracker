import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualExpensesComponent } from './actual-expenses.component';

describe('ActualExpensesComponent', () => {
  let component: ActualExpensesComponent;
  let fixture: ComponentFixture<ActualExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualExpensesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
