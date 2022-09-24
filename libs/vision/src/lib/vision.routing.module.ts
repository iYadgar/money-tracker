import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VisionComponent } from './features/vision/vision.component';

const routes: Routes = [
  {
    path: '',
    component: VisionComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisionRoutingModule {}
