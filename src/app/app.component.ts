import { CacheImageService } from './services/cache-image.service';
import { Component } from '@angular/core';
import { PreferenceService } from './services/storage/preference.service';
import { StorageApiService } from './services/storage/storage-api.service';

export type AuthenticatedUser = {
  id: number;
  name: string;
  email: string;
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storageApiService: StorageApiService,
    private preferenceService: PreferenceService,
    private cacheImageService: CacheImageService
  ) {
    this.cacheImageService.init();
    this.storageApiService.init();

    const user = {
      id: 1,
      name: 'Luiggi',
      email: 'luiggiplasencia0823@gmail.com',
    };

    this.preferenceService.set<string>('config', 'test0001');
    this.preferenceService.set('user', user);
  }
}
