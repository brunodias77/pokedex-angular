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
  public offset: number = 0; // Controle da paginação
  public limit: number = 21; // Número de pokémons por página

  constructor(
    private pokeApiService: PokeApiService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.getPokemons();

    this.searchService.currentSearchTerm.subscribe((term) => {
      this.searchTerm = term;
      this.filterPokemons();
    });
  }

  // Função para obter os Pokémons da página atual
  getPokemons(): void {
    this.isLoading = true;
    this.pokeApiService
      .getPokemonList(this.offset, this.limit)
      .subscribe((data) => {
        this.pokemons = data.results;
        this.filteredPokemons = this.pokemons;
        this.isLoading = false;
      });
  }

  // Método para ir para a próxima página
  nextPage(): void {
    this.offset += this.limit;
    this.getPokemons();
  }

  // Método para voltar à página anterior
  prevPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.getPokemons();
    }
  }

  filterPokemons(): void {
    if (this.searchTerm) {
      this.filteredPokemons = this.pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPokemons = this.pokemons;
    }
  }
}

// @Component({
//   selector: 'app-poke-list',
//   standalone: true,
//   imports: [CommonModule, CardComponent],
//   templateUrl: './poke-list.component.html',
//   styleUrls: ['./poke-list.component.scss'],
// })
// export class PokeListComponent implements OnInit {
//   public pokemons: any[] = [];
//   public filteredPokemons: any[] = [];
//   public isLoading: boolean = true;
//   public searchTerm: string = '';

//   constructor(
//     private pokeApiService: PokeApiService,
//     private searchService: SearchService // Injetar o SearchService
//   ) {}

//   ngOnInit(): void {
//     // Subscrição para obter todos os Pokémons
//     this.pokeApiService.apiListAllPokemons.subscribe((data) => {
//       this.pokemons = data.results;
//       this.filteredPokemons = this.pokemons; // Inicialmente, todos os Pokémons são exibidos
//       this.isLoading = false;
//     });

//     // Subscrição para receber atualizações do termo de busca
//     this.searchService.currentSearchTerm.subscribe((term) => {
//       this.searchTerm = term;
//       console.log('Estou na  PokeList:', this.searchTerm); // Log para verificar
//       this.filterPokemons(); // Filtrar a lista de Pokémons com base no termo de busca
//     });
//   }

//   // Método para filtrar os Pokémons com base no searchTerm
//   filterPokemons(): void {
//     if (this.searchTerm) {
//       this.filteredPokemons = this.pokemons.filter((pokemon) =>
//         pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
//       );
//       console.log('na funcao filterPokemons', this.filteredPokemons);
//     } else {
//       this.filteredPokemons = this.pokemons; // Se não houver busca, mostrar todos
//     }
//   }
// }
