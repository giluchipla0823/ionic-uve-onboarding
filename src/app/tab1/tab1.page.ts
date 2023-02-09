import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { iosTransitionAnimation, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild('popover') popover;

  constructor(private router: Router, private navCtrl: NavController) {}

  goToFormsPage() {
    this.navCtrl.navigateForward('/forms', {
      animation: iosTransitionAnimation,
    });
  }

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
