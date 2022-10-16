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
export interface AssetGroup {
  createdAt: string;
  assets: Asset[];
  id: string;
}
export interface Asset {
  type: string;
  link?: string;
  establishment: string;
  amount: number;
  id?: string;
  isPension?: boolean | 'Yes' | 'No';
}
export interface AssetGroupWorth {
  withPension: number;
  withoutPension: number;
}
export type TableViewConfig = {
  pagination?: boolean;
  quickFilters?: boolean;
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
  isGroup?: boolean;
  label: string;
  isCurrency?: boolean;
  selectableValues?: { value: any; viewValue: string }[];
  isDate?: boolean;
  filter?: boolean;
  linkConfig?: {
    displayValue: string;
  };
}

export interface Category {
  name: string;
  id: string;
  user: string;
}
