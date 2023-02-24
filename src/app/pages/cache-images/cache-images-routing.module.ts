import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CacheImagesPage } from './cache-images.page';

const routes: Routes = [
  {
    path: '',
    component: CacheImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CacheImagesPageRoutingModule {}
