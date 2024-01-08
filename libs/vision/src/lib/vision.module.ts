import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisionRoutingModule } from './vision.routing.module';
import { VisionComponent } from './features/vision/vision.component';
import { ExpensesCardComponent } from './ui/expenses-card/expenses-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IncomeComponent } from './ui/income/income.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SummaryComponent } from './ui/summary/summary.component';
import { AddExpanseDialogComponent } from './ui/add-expanse-dialog/add-expanse-dialog.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogModule,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '@money-tracker/ui';
import { AuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    VisionRoutingModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    UiModule,
  ],
  declarations: [
    VisionComponent,
    ExpensesCardComponent,
    IncomeComponent,
    SummaryComponent,
    AddExpanseDialogComponent,
  ],
  providers: [[AuthGuard]],
})
export class VisionModule {}
