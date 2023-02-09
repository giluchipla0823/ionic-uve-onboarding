import { ModalPdfViewerPage } from './../modal-pdf-viewer/modal-pdf-viewer.page';
import { PopoverSelectorComponent } from './popover-selector/popover-selector.component';
import { ModalExamplePage } from './../modal-example/modal-example.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { LoadingController as MyLoadingController } from 'src/app/controllers/loading.controller';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('popover') popover;

  variableTest = 'hola mundo';
  variableTest2 = '<strong>hola</strong> mundo';
  word = 'Say';

  constructor(
    private modalCtrl: ModalController,
    private myLoadingCtrl: MyLoadingController,
    private loadingCtrl: LoadingController,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.variableTest2 = `${this.variableTest2} / <strong>${this.word}</strong>  /// ${this.word} ${this.word}`;
  }

  async openModalExample() {
    const modal = await this.modalCtrl.create({
      component: ModalExamplePage,
    });

    await modal.present();
  }

  async openModalPDFViewer() {
    const modal = await this.modalCtrl.create({
      component: ModalPdfViewerPage,
    });

    await modal.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({ message: 'aaaa' });

    await loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  loadDynamicComponent() {
    const loading = this.myLoadingCtrl.create('Procesando...');

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  async showPopoverController($event: Event) {
    const popover = await this.popoverController.create({
      component: PopoverSelectorComponent,
      mode: 'ios',
      side: 'bottom',
      alignment: 'center',
      event: $event,
    });

    await popover.present();

    const { data, role } = await popover.onDidDismiss();

    console.log('POPOVER CLOSE', { data, role });
  }
}
