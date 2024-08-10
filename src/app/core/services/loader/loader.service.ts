import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class LoaderService {
  private showLoadingSubject = new BehaviorSubject<boolean>(false);
  public showLoading$: Observable<boolean> =
    this.showLoadingSubject.asObservable();
  constructor() {}

  show() {
    if (this.showLoadingSubject.value === false) {
      this.showLoadingSubject.next(true);
    }
  }

  hide() {
    if (this.showLoadingSubject.value === true) {
      this.showLoadingSubject.next(false);
    }
  }
}
