import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarCustomTemplatePage } from './calendar-custom-template.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarCustomTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarCustomTemplatePageRoutingModule {}
