import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>(''); // Inicialmente vazio
  currentSearchTerm = this.searchTerm.asObservable();

  constructor() {}

  changeSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
