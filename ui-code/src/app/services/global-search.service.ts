import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {

  constructor() { }

  private globalSearchSource = new Subject<string>();
  globalSearchSource$ = this.globalSearchSource.asObservable();

  globalSearch(text) {
    this.globalSearchSource.next(text);
  }
}
