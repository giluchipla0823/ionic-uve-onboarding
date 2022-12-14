import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarCustomTemplatePageRoutingModule } from './calendar-custom-template-routing.module';

import { CalendarCustomTemplatePage } from './calendar-custom-template.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarCustomTemplatePageRoutingModule
  ],
  declarations: [CalendarCustomTemplatePage]
})
export class CalendarCustomTemplatePageModule {}
