// Importa os módulos e serviços necessários
import { Component, OnInit } from '@angular/core'; // Para criar componentes e implementar o ciclo de vida OnInit
import { PokeApiService } from '../../services/poke-api.service'; // Serviço que consome a API de Pokémon
import { CommonModule } from '@angular/common'; // Módulo Angular comum (ngFor, ngIf, etc.)
import { CardComponent } from '../card/card.component'; // Componente de Card que será usado na lista de Pokémons

@Component({
  selector: 'app-poke-list', // Define o seletor HTML para o componente
  standalone: true, // Define que este componente é standalone, ou seja, não depende de um módulo pai
  imports: [CommonModule, CardComponent], // Importa módulos e componentes que este componente usará
  templateUrl: './poke-list.component.html', // Define o arquivo de template HTML
  styleUrls: ['./poke-list.component.scss'], // Define o arquivo de estilos específicos para este componente
})
export class PokeListComponent implements OnInit {
  // Propriedade pública que armazenará os dados dos Pokémons
  public pokemons: any;

  // O construtor injeta o serviço PokeApiService para acessar os dados da API
  constructor(private pokeApiService: PokeApiService) {}

  // Método de ciclo de vida que é chamado após a inicialização do componente
  ngOnInit(): void {
    // Chama o método do serviço para obter a lista de todos os Pokémons
    this.pokeApiService.apiListAllPokemons.subscribe((data) => {
      // Atribui os dados retornados à variável pokemons
      this.pokemons = data.results;
      // Loga os dados no console para depuração
      console.log('data', data.results);
      console.log(this.pokemons);
    });
  }
}
