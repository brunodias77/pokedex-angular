import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchTerm: string = '';
  constructor(private searchService: SearchService) {}

  onSearchChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    console.log('Estou no Search Component com ', this.searchTerm);
    this.searchService.changeSearchTerm(this.searchTerm); // Atualiza o termo no serviço
  }
}
