import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  private showLoadingSubject = new BehaviorSubject<boolean>(false);
  public showLoading$: Observable<boolean> =
    this.showLoadingSubject.asObservable();
  constructor() {
    this.hide();
  }

  show() {
    this.showLoadingSubject.next(true);
  }

  hide() {
    this.showLoadingSubject.next(false);
  }
}
