import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
  IsRowSelectable,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { SelectComponent } from './select/select.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { Subject } from 'rxjs';
import readXlsxFile from 'read-excel-file';
import { TableBulkUpdateEvent } from '../interfaces';
import { LinkCellComponent } from './link-cell/link-cell.component';

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
  @Input() viewConfig: TableViewConfig;
  @Input() dataSource: Record<any, any>[];
  @Output() deleted = new EventEmitter<any>();
  @Output() cellEdited = new EventEmitter<any>();
  @Output() bulkUpdated = new EventEmitter<TableBulkUpdateEvent>();
  @Output() imported = new EventEmitter<any[][]>();
  @ViewChild('deleteButton') deleteButton: TemplateRef<MatButton>;
  @ViewChild('uploadInput') uploadInput: ElementRef<HTMLInputElement>;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.gridApi.sizeColumnsToFit();
  }
  isRowSelectable: IsRowSelectable = (node) => !!this.viewConfig.isSelectable;

  constructor(private currencyPipe: CurrencyPipe, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.initViewConfig();
    this.displayedColumns = this.getDisplayedColumns();
  }
  initViewConfig() {
    this.viewConfig = {
      ...this.viewConfig,
      isResizeable: !!this.viewConfig.isResizeable,
      rowSelection: this.viewConfig.rowSelection || 'multiple',
      isSelectable: !!this.viewConfig.isSelectable,
      shouldImport: !!this.viewConfig.shouldImport,
      shouldExport: !!this.viewConfig.shouldExport,
    };
  }

  handleDeleted(element: any) {
    this.deleted.emit(element);
  }

  onGridReady(event: GridReadyEvent<any>) {
    event.api.sizeColumnsToFit();
    this.gridApi = event.api;
  }

  handleCellValueChange(param: CellValueChangedEvent<any>) {
    const selectedRows = param.api
      .getSelectedNodes()
      .map((selectedRow) => selectedRow.data);
    if (selectedRows.length) {
      this.bulkUpdated.emit({
        selectedRows,
        field: param.colDef?.field || '',
        value: param.value,
      });
    } else {
      this.cellEdited.emit(param.data);
    }
  }
  getDisplayedColumns(): ColDef[] {
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
    const response = [
      ...Object.keys(this.viewConfig.columnDefs).map((key): ColDef => {
        const currentConfig = this.viewConfig.columnDefs[key];
        const isLink = !!currentConfig.linkConfig;
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

        const getLinkColumn = (params: Record<any, any>) => ({
          cellRenderer: LinkCellComponent,
          cellRendererParams: {
            ...params,
          },
        });
        return {
          headerName,
          floatingFilter: shouldFilter,
          field: key,
          editable: this.viewConfig.isEditable,
          resizable: this.viewConfig.isResizeable,
          sortable: true,
          ...currentFilter,
          ...(isSelectable && selectableColumn),
          ...(isCurrency && currencyColumn),
          ...(isDateColumn && dateColumn),
          ...(isLink &&
            getLinkColumn(currentConfig.linkConfig as Record<string, string>)),
        };
      }),
    ];
    if (this.viewConfig.isEditable) {
      response.unshift(deleteCol);
    }
    if (this.viewConfig.isSelectable) {
      response[1] = {
        ...response[1],
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        showDisabledCheckboxes: true,
      };
    }

    return response;
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

  openImport() {
    this.uploadInput.nativeElement.click();
  }

  async handleImport(event: any) {
    const response = await readXlsxFile(event.target.files[0]);
    this.imported.emit(response.slice(1, response.length));
  }

  onSelectionChange(event: SelectionChangedEvent<any>) {
    const selectedRows = event.api.getSelectedRows();
  }

  handleQuickSearch(value: string) {
    this.gridApi.setQuickFilter(value);
  }
}
