import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPdfViewerPageRoutingModule } from './modal-pdf-viewer-routing.module';

import { ModalPdfViewerPage } from './modal-pdf-viewer.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPdfViewerPageRoutingModule,
    PdfViewerModule,
  ],
  declarations: [ModalPdfViewerPage],
})
export class ModalPdfViewerPageModule {}
