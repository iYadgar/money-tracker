import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { APP_ROUTES } from '@money-tracker/common';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [
      {
        path: '',
        redirectTo: APP_ROUTES.VISION,
        pathMatch: 'full',
      },
      {
        path: APP_ROUTES.VISION,
        loadChildren: () =>
          import('@money-tracker/vision').then((m) => m.VisionModule),
      },
      {
        path: APP_ROUTES.DASHBOARD,
        loadChildren: () =>
          import('@money-tracker/dashboard').then((m) => m.DashboardModule),
      },
      {
        path: APP_ROUTES.EXPENSES,
        loadChildren: () =>
          import('@money-tracker/expenses').then((m) => m.ExpensesModule),
      },
      {
        path: APP_ROUTES.ASSETS,
        loadChildren: () =>
          import('@money-tracker/assets').then((m) => m.AssetsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
