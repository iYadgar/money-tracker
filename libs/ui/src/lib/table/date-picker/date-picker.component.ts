import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'money-tracker-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent
  implements ICellEditorAngularComp, AfterViewInit
{
  @ViewChild('picker') datePicker: MatDatepicker<any>;
  selectedDate: any;
  stopEditing: () => void;
  handleDateChange(event: MatDatepickerInputEvent<Date, unknown | null>) {
    this.selectedDate = event.value?.toISOString();
    this.stopEditing();
  }

  agInit(params: ICellEditorParams): void {
    this.stopEditing = params.stopEditing;
  }

  getValue(): any {
    return this.selectedDate;
  }

  ngAfterViewInit(): void {
    this.datePicker.open();
  }

  isPopup(): boolean {
    return true;
  }
}
