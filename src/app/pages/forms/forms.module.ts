import { FormEventItemComponent } from './form-event-item/form-event-item.component';
import { ErrorMessagesModule } from './../../components/error-messages/error-messages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsPageRoutingModule } from './forms-routing.module';

import { FormsPage } from './forms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessagesModule,
  ],
  declarations: [FormsPage, FormEventItemComponent],
})
export class FormsPageModule {}
