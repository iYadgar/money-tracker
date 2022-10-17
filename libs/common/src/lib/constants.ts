import { APP_ROUTES } from './enums';
import { ChartViewConfig, TableViewConfig } from './interface';
import { LegendPosition } from '@swimlane/ngx-charts';

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
  isEditable: true,
  columnDefs: {
    name: { isCurrency: false, label: 'Name' },
    value: { isCurrency: true, label: 'Amount' },
  },
};

export const DETAILED_EXPENSES_TABLE_VIEW_CONFIG: TableViewConfig = {
  isEditable: true,
  isSelectable: true,
  rowSelection: 'multiple',
  shouldImport: true,
  shouldExport: true,
  quickFilters: true,
  pagination: true,
  columnDefs: {
    name: { label: 'Name', filter: true },
    value: { isCurrency: true, label: 'Amount', filter: true },
    date: { label: 'Date', isDate: true, filter: true },
  },
};

export const ASSETS_TABLE_VIEW_CONFIG: TableViewConfig = {
  isResizeable: true,
  isEditable: true,
  columnDefs: {
    type: { label: 'Type' },
    link: {
      label: 'Private area link',
      linkConfig: {
        displayValue: 'Personal area',
      },
    },
    establishment: { label: 'Establishment' },
    amount: { label: 'Amount', isCurrency: true },
    isPension: {
      label: 'Pension',
      selectableValues: [
        {
          value: true,
          viewValue: 'Yes',
        },
        {
          value: false,
          viewValue: 'No',
        },
      ],
    },
  },
};
export const ACTUAL_EXPENSES_TABLE_CONFIG: TableViewConfig = {
  isEditable: false,
  shouldDelete: false,
  columnDefs: {
    month: { label: 'Month' },
    year: { label: 'Year' },
    income: { label: 'Income', isCurrency: true },
    expensesAmount: { label: 'Expenses', isCurrency: true },
    toSafeFund: { label: 'To safe fund', isCurrency: true },
    toInvestment: { label: 'To investment', isCurrency: true },
  },
};

export const EXPENSE_BY_CATEGORY_CHART_CONFIG: ChartViewConfig = {
  title: 'All time expenses by categories',
  chartType: 'pie',
  showLabels: true,
  showLegend: false,
  legendPosition: LegendPosition.Below,
};
export const MONTHLY_EXPENSE_BY_CATEGORY_CHART_CONFIG: ChartViewConfig = {
  title: 'Monthly expenses by categories',
  chartType: 'bar',
  showLabels: true,
  showLegend: false,
  legendPosition: LegendPosition.Below,
};
