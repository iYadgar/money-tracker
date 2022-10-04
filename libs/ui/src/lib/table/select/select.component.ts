import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatSelect, MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'money-tracker-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('select') select: MatSelect;
  stopEditing: () => void;
  selections: { value: any; viewValue: string }[];
  selected: any;

  ngAfterViewInit() {
    this.select.open();
  }

  agInit(params: any): void {
    this.stopEditing = params.stopEditing;
    this.selections = params.values as any;
  }
  isPopup?(): boolean {
    return true;
  }
  getValue(): any {
    return this.selected;
  }

  handleSelection(event: MatSelectChange) {
    this.selected = event.value;
    this.stopEditing();
  }
}
