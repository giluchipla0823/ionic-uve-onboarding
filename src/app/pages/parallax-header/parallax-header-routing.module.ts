import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParallaxHeaderPage } from './parallax-header.page';

const routes: Routes = [
  {
    path: '',
    component: ParallaxHeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParallaxHeaderPageRoutingModule {}
