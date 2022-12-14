import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarBasicPage } from './calendar-basic.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarBasicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarBasicPageRoutingModule {}
