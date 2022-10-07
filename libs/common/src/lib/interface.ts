export interface ExpenseGroup {
  name: string;
  value: number;
  id: string;
}
export interface User {
  name: string;
  id: string;
}

export interface Income {
  user: string;
  value: number;
  id: string;
}
export interface DetailedExpense {
  name: string;
  value: number;
  date: string;
  category: string;
  id: string;
  user: string;
}
export type TableViewConfig = {
  addLabel?: string;
  isResizeable?: boolean;
  isEditable?: boolean;
  rowSelection?: 'single' | 'multiple';
  isSelectable?: boolean;
  shouldImport?: boolean;
  shouldExport?: boolean;
  columnDefs: Record<string, ColumnAttributes>;
};

export interface ColumnAttributes {
  label: string;
  isCurrency?: boolean;
  selectableValues?: { value: any; viewValue: string }[];
  isDate?: boolean;
  filter?: boolean;
}

export interface Category {
  name: string;
  id: string;
  user: string;
}
