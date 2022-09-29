export interface Expense {
  name: string;
  value: number;
  id?: string;
}
export interface User {
  name: string;
  id?: string;
}

export interface Income {
  user: string;
  value: number;
  id?: string;
}
export type TableViewConfig = Record<
  string,
  { label: string; isCurrency: boolean }
>;
