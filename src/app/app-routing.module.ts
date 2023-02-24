import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./pages/forms/forms.module').then((m) => m.FormsPageModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./pages/calendar/calendar.module').then(
        (m) => m.CalendarPageModule
      ),
  },
  {
    path: 'calendar/calendar-basic',
    loadChildren: () =>
      import('./pages/calendar/calendar-basic/calendar-basic.module').then(
        (m) => m.CalendarBasicPageModule
      ),
  },
  {
    path: 'calendar/calendar-custom-template',
    loadChildren: () =>
      import(
        './pages/calendar/calendar-custom-template/calendar-custom-template.module'
      ).then((m) => m.CalendarCustomTemplatePageModule),
  },
  {
    path: 'modal-pdf-viewer',
    loadChildren: () =>
      import('./pages/modal-pdf-viewer/modal-pdf-viewer.module').then(
        (m) => m.ModalPdfViewerPageModule
      ),
  },
  {
    path: 'download-files',
    loadChildren: () =>
      import('./pages/download-files/download-files.module').then(
        (m) => m.DownloadFilesPageModule
      ),
  },
  {
    path: 'storage-api',
    loadChildren: () =>
      import('./pages/storage-cache-api/storage-cache-api.module').then(
        (m) => m.StorageCacheApiPageModule
      ),
  },  {
    path: 'cache-images',
    loadChildren: () => import('./pages/cache-images/cache-images.module').then( m => m.CacheImagesPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
