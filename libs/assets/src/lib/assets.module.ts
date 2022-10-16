import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssetsComponent } from './features/assets/assets.component';
import { AssetsRoutingModule } from './assets-routing.module';
import { UiModule } from '@money-tracker/ui';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateNewGroupComponent } from './features/assets/create-new-group/create-new-group.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateNewGroupDialogComponent } from './features/assets/create-new-group-dialog/create-new-group-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  imports: [
    CommonModule,
    AssetsRoutingModule,
    UiModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
  ],
  declarations: [
    AssetsComponent,
    CreateNewGroupComponent,
    CreateNewGroupDialogComponent,
  ],
})
export class AssetsModule {}
