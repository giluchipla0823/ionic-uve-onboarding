import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import { StorageApiService } from 'src/app/services/storage/storage-api.service';
import { PreferenceService } from 'src/app/services/storage/preference.service';
import { AuthenticatedUser } from 'src/app/app.component';

@Component({
  selector: 'app-storage-cache-api',
  templateUrl: './storage-cache-api.page.html',
  styleUrls: ['./storage-cache-api.page.scss'],
})
export class StorageCacheApiPage implements OnInit {
  users: Array<any> = [];
  preferenceConfigValue: string;
  cacheCreatedAt: number;

  constructor(
    private userService: UserService,
    private storageApiService: StorageApiService,
    private preferenceService: PreferenceService,
    private loadingController: LoadingController
  ) {
    this.loadingController.create({ animated: false }).then((loading) => {
      loading.present();
      loading.dismiss();
    });
  }

  async ngOnInit() {
    this.preferenceConfigValue = await this.preferenceService.get('config');

    const user = await this.preferenceService.get<AuthenticatedUser>('user');

    console.log('USER', user);
  }

  async refreshUsers(forceRefresh: boolean) {
    const loading = await this.loadingController.create({
      message: 'Loading data...',
    });

    await loading.present();

    this.userService
      .getUsers(forceRefresh)
      .pipe(finalize(() => loading.dismiss()))
      .subscribe(({ data, createdAt }) => {
        this.users = data;
        this.cacheCreatedAt = createdAt;
      });
  }

  clearData(): void {
    this.users = [];
  }

  clearCache(): void {
    this.storageApiService.clear();
  }
}
