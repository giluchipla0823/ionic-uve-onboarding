import { PopoverSelectorComponent } from './popover-selector/popover-selector.component';
import { ModalExamplePageModule } from './../modal-example/modal-example.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ModalExamplePageModule,
  ],
  declarations: [HomePage, PopoverSelectorComponent],
})
export class HomePageModule {}
