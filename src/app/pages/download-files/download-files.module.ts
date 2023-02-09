import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadFilesPageRoutingModule } from './download-files-routing.module';

import { DownloadFilesPage } from './download-files.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DownloadFilesPageRoutingModule
  ],
  declarations: [DownloadFilesPage]
})
export class DownloadFilesPageModule {}
