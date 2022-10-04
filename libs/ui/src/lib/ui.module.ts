import { NgModule } from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DatePipe,
} from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteButtonComponent } from './table/delete-button/delete-button.component';
import { SelectComponent } from './table/select/select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from './table/date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoryPipe } from './pipes/category.pipe';
import { ExpandableSearchComponent } from './expandable-search/expandable-search.component';
import { NgLetModule } from 'ng-let';
import { ReactiveFormsModule } from '@angular/forms';
import { ClickedOutsideDirective } from './directives/clicked-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    AgGridModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgLetModule,
    ReactiveFormsModule,
  ],
  providers: [
    CurrencyPipe,
    DatePipe,
    AsyncPipe,
    CategoryPipe,
    ClickedOutsideDirective,
  ],
  declarations: [
    LogoComponent,
    TableComponent,
    DeleteButtonComponent,
    SelectComponent,
    DatePickerComponent,
    CategoryPipe,
    ExpandableSearchComponent,
    ClickedOutsideDirective,
  ],
  exports: [LogoComponent, TableComponent],
})
export class UiModule {}
