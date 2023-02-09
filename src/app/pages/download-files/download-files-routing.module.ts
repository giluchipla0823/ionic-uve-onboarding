import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DownloadFilesPage } from './download-files.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadFilesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DownloadFilesPageRoutingModule {}
