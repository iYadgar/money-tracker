import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { env } from '@money-tracker/common';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@money-tracker/layout').then((m) => m.LayoutModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(env.firebase),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
