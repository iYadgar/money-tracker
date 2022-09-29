import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { TableViewConfig } from '@money-tracker/common';

@Component({
  selector: 'money-tracker-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() viewConfig: TableViewConfig;
  @Input() dataSource: Record<any, any>[];
  @Output() deleted = new EventEmitter<any>();

  displayedColumns: string[];

  ngOnInit(): void {
    this.displayedColumns = ['edit', ...Object.keys(this.viewConfig)];
  }

  handleDeleted(element: any) {
    this.deleted.emit(element);
  }
}
