import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'money-tracker-link-cell',
  templateUrl: './link-cell.component.html',
  styleUrls: ['./link-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkCellComponent implements AgRendererComponent {
  link: string;
  displayValue: string;

  agInit(params: any): void {
    this.link = params.value;
    this.displayValue = params.displayValue;
  }

  refresh(params: ICellRendererParams<any>): boolean {
    return false;
  }
}
