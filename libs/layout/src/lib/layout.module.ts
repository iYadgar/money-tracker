import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout.routing.module';
import { SidePanelComponent } from './ui/side-panel/side-panel.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UiModule } from '@money-tracker/ui';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './ui/navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatIconModule,
    MatButtonModule,
    UiModule,
    MatCardModule,
    MatMenuModule,
  ],
  declarations: [LayoutComponent, SidePanelComponent, NavbarComponent],
})
export class LayoutModule {}
