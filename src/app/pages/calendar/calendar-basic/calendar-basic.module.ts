import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarBasicPageRoutingModule } from './calendar-basic-routing.module';

import { CalendarBasicPage } from './calendar-basic.page';

import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarBasicPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [CalendarBasicPage]
})
export class CalendarBasicPageModule { }
