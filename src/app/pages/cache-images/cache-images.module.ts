import { CacheImageComponent } from './cache-image/cache-image.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CacheImagesPageRoutingModule } from './cache-images-routing.module';

import { CacheImagesPage } from './cache-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CacheImagesPageRoutingModule,
  ],
  declarations: [CacheImagesPage, CacheImageComponent],
})
export class CacheImagesPageModule {}
