import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  declarations: [LogoComponent, TableComponent],
  exports: [LogoComponent, TableComponent],
})
export class UiModule {}
