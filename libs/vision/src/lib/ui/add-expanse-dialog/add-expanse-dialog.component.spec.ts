import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpanseDialogComponent } from './add-expanse-dialog.component';

describe('AddExpanseDialogComponent', () => {
  let component: AddExpanseDialogComponent;
  let fixture: ComponentFixture<AddExpanseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExpanseDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddExpanseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
