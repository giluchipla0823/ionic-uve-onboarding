
import { ModalExamplePage } from './../modal-example/modal-example.page';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingController as MyLoadingController } from 'src/app/controllers/loading.controller';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private myLoadingCtrl: MyLoadingController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {

  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalExamplePage
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

}
