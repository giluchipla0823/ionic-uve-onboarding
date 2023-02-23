import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormEventItemService {
  // private _downloadItem$: Subject<any> = new Subject<any>();
  private _downloadItem$: BehaviorSubject<any> = new BehaviorSubject<any>({
    id: 0,
    name: 'Luiggi',
  });

  constructor() {}

  get downloadItem$(): Observable<any> {
    return this._downloadItem$.asObservable();
  }

  set downloadItem$(value: any) {
    this._downloadItem$.next(value);
  }
}
