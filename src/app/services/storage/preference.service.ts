import { Injectable } from '@angular/core';
import { Preferences, PreferencesPlugin } from '@capacitor/preferences';
import { StorageAdapter } from './storage-adapter.interface';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService implements StorageAdapter {
  storage: PreferencesPlugin;

  constructor() {
    this.storage = Preferences;
  }

  async get<T>(key: string): Promise<T> {
    const { value } = await this.storage.get({ key });

    return JSON.parse(value);
  }

  set<T>(key: string, value: T): Promise<any> {
    return this.storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async clear(): Promise<void> {
    return this.storage.clear();
  }

  async remove(key: string): Promise<void> {
    await this.storage.remove({ key });
  }
}
