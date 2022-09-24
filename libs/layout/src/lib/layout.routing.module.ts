import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { APP_ROUTES } from '../../../common/src/lib/enums';

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
          import('@money-tracker/vision').then((m) => m.VisionModule),
      },
      {
        path: APP_ROUTES.EXPANSES,
        loadChildren: () =>
          import('@money-tracker/vision').then((m) => m.VisionModule),
      },
      {
        path: APP_ROUTES.ASSETS,
        loadChildren: () =>
          import('@money-tracker/vision').then((m) => m.VisionModule),
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
