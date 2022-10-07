import { APP_ROUTES } from './enums';
import { TableViewConfig } from './interface';

export const APP_ROUTES_CONFIG: { path: string; icon: string }[] = [
  {
    path: APP_ROUTES.VISION,
    icon: 'visibility_outline',
  },
  {
    path: APP_ROUTES.EXPENSES,
    icon: 'backup_table',
  },
  {
    path: APP_ROUTES.ASSETS,
    icon: 'home_work',
  },
  {
    path: APP_ROUTES.DASHBOARD,
    icon: 'dashboard_outline',
  },
];

export const EXPENSES_TABLE_VIEW_CONFIG: TableViewConfig = {
  columnDefs: {
    name: { isCurrency: false, label: 'Name' },
    value: { isCurrency: true, label: 'Amount' },
  },
};

export const DETAILED_EXPENSES_TABLE_VIEW_CONFIG: TableViewConfig = {
  isSelectable: true,
  rowSelection: 'multiple',
  shouldImport: true,
  shouldExport: true,
  columnDefs: {
    name: { label: 'Name', filter: true },
    value: { isCurrency: true, label: 'Amount', filter: true },
    date: { label: 'Date', isDate: true, filter: true },
    category: { label: 'Category', filter: true },
  },
};

export const EXPENSES_IMPORT_CONFIG = [
  { tableName: 'Date', key: 'date' },
  { tableName: 'Name of expense', key: 'name' },
  { tableName: 'Amount', key: 'value' },
];
