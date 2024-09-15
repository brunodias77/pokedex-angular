import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { SearchService } from '../../services/search.service'; // Importar o SearchService

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public pokemons: any[] = [];
  public filteredPokemons: any[] = [];
  public isLoading: boolean = true;
  public searchTerm: string = '';

  constructor(
    private pokeApiService: PokeApiService,
    private searchService: SearchService // Injetar o SearchService
  ) {}

  ngOnInit(): void {
    // Subscrição para obter todos os Pokémons
    this.pokeApiService.apiListAllPokemons.subscribe((data) => {
      this.pokemons = data.results;
      this.filteredPokemons = this.pokemons; // Inicialmente, todos os Pokémons são exibidos
      this.isLoading = false;
    });

    // Subscrição para receber atualizações do termo de busca
    this.searchService.currentSearchTerm.subscribe((term) => {
      this.searchTerm = term;
      console.log('Estou na  PokeList:', this.searchTerm); // Log para verificar
      this.filterPokemons(); // Filtrar a lista de Pokémons com base no termo de busca
    });
  }

  // Método para filtrar os Pokémons com base no searchTerm
  filterPokemons(): void {
    if (this.searchTerm) {
      this.filteredPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      console.log('na funcao filterPokemons', this.filteredPokemons);
    } else {
      this.filteredPokemons = this.pokemons; // Se não houver busca, mostrar todos
    }
  }
}
