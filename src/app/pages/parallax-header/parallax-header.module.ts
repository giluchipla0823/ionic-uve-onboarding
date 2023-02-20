import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParallaxHeaderPageRoutingModule } from './parallax-header-routing.module';

import { ParallaxHeaderPage } from './parallax-header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParallaxHeaderPageRoutingModule,
    DirectivesModule,
  ],
  declarations: [ParallaxHeaderPage],
})
export class ParallaxHeaderPageModule {}
