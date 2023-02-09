import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pdf-viewer',
  templateUrl: './modal-pdf-viewer.page.html',
  styleUrls: ['./modal-pdf-viewer.page.scss'],
})
export class ModalPdfViewerPage implements OnInit {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
