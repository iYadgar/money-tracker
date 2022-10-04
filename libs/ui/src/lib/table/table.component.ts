import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TableViewConfig } from '@money-tracker/common';
import {
  CellValueChangedEvent,
  ColDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'money-tracker-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  gridApi: GridApi;
  displayedColumns: ColDef[];
  searchValue$ = new Subject<string>();
  destroy$ = new Subject();
  dataSource$: Observable<Record<any, any>[]>;
  @Input() viewConfig: TableViewConfig;
  @Input() dataSource: Record<any, any>[];
  @Input() addLabel: string;
  @Input() isResizeable = false;
  @Input() isEditable = true;
  @Output() deleted = new EventEmitter<any>();
  @Output() cellEdited = new EventEmitter<any>();
  @ViewChild('deleteButton') deleteButton: TemplateRef<MatButton>;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.gridApi.sizeColumnsToFit();
  }

  constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns();
    this.dataSource$ = this.searchValue$.asObservable().pipe(
      startWith(''),
      map((value) => {
        return this.dataSource.filter((obj) =>
          Object.values(obj).some((v) => {
            const simplifiedSearchValue = value.toLowerCase().trim();
            const simplifiedDataValue = v.toString().toLowerCase().trim();
            return simplifiedDataValue.includes(simplifiedSearchValue);
          })
        );
      })
    );
  }

  handleDeleted(element: any) {
    this.deleted.emit(element);
  }

  onGridReady(event: GridReadyEvent<any>) {
    event.api.sizeColumnsToFit();
    this.gridApi = event.api;
  }

  handleCellValueChange(param: CellValueChangedEvent<any>) {
    this.cellEdited.emit(param.data);
  }
  getDisplayedColumns() {
    const deleteCol: ColDef = {
      headerName: '',
      field: 'delete',
      cellRenderer: DeleteButtonComponent,
      width: 40,
      onCellClicked: (event) => {
        this.handleDeleted(event.data);
      },
      cellClass: 'delete-cell',
    };

    return [
      deleteCol,
      ...Object.keys(this.viewConfig).map((key) => {
        const currentConfig = this.viewConfig[key];
        const isCurrency = currentConfig.isCurrency;
        const isSelectable = !!currentConfig.selectableValues;
        const headerName = currentConfig.label;
        const isDateColumn = currentConfig.isDate;
        const shouldFilter = currentConfig.filter;
        const currentFilter = shouldFilter && {
          filter: isDateColumn
            ? 'agDateColumnFilter'
            : isCurrency
            ? 'agNumberColumnFilter'
            : 'agTextColumnFilter',
        };
        const currencyColumn = {
          valueFormatter: (param: any) =>
            this.currencyPipe.transform(param.value, 'ILS') as string,
        };
        const selectableColumn = {
          cellEditor: SelectComponent,
          cellEditorParams: {
            values: isSelectable && currentConfig.selectableValues,
          },
        };
        const dateColumn = {
          valueFormatter: (param: any) =>
            this.datePipe.transform(param.value, 'dd/MM/yy') as string,
          cellEditor: DatePickerComponent,
        };

        return {
          headerName,
          floatingFilter: shouldFilter,
          field: key,
          editable: this.isEditable,
          resizable: this.isResizeable,
          sortable: true,
          ...currentFilter,
          ...(isSelectable && selectableColumn),
          ...(isCurrency && currencyColumn),
          ...(isDateColumn && dateColumn),
        };
      }),
    ];
  }

  handleAddRow() {
    const colKey = this.displayedColumns[1]?.field || '';
    this.gridApi.applyTransaction({ add: [{}], addIndex: 0 });
    this.gridApi.setFocusedCell(0, colKey);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey,
    });
  }

  handleExport() {
    this.gridApi.exportDataAsCsv();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
