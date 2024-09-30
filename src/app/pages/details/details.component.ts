import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importa ActivatedRoute para acessar parâmetros da rota e RouterLink para navegação.
import { PokeApiService } from '../../services/poke-api.service'; // Serviço personalizado para acessar a API da PokeAPI.
import { forkJoin } from 'rxjs'; // Combina múltiplas chamadas assíncronas em uma única operação.
import { CommonModule } from '@angular/common'; // Importa CommonModule para funcionalidades comuns do Angular, como diretivas.

@Component({
  selector: 'app-details', // Define o seletor do componente.
  standalone: true, // Torna o componente independente, não requer um módulo pai.
  imports: [RouterLink, CommonModule], // Especifica os módulos que o componente importa.
  templateUrl: './details.component.html', // Template HTML do componente.
  styleUrl: './details.component.scss', // Arquivo de estilos do componente.
})
export class DetailsComponent implements OnInit {
  // URL base da API para buscar detalhes do Pokémon.
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  // URL base da API para buscar informações sobre a espécie do Pokémon.
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  // Armazena os dados do Pokémon.
  public pokemon: any;
  // Indicador de carregamento dos dados.
  public isLoading: boolean = false;
  // Indicador de erro na chamada da API.
  public apiError: boolean = false;
  public pokemonType: string = '';
  public pokemonName: string = '';
  public pokemonImg: string = '';

  constructor(
    private activeRoute: ActivatedRoute, // Injeta o serviço ActivatedRoute para obter parâmetros da rota.
    private pokeApiService: PokeApiService // Injeta o serviço PokeApiService para chamadas à API.
  ) {}

  ngOnInit(): void {
    // Chama o método getPokemon ao inicializar o componente.
    this.getPokemon;
  }

  // Getter que realiza chamadas à API para obter os detalhes do Pokémon e sua espécie.
  get getPokemon() {
    // Obtém o parâmetro 'id' da rota ativa (o ID do Pokémon).
    const id = this.activeRoute.snapshot.params['id'];

    // Faz a chamada à API para obter detalhes do Pokémon.
    const pokemon = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${id}`
    );

    // Faz a chamada à API para obter detalhes da espécie do Pokémon.
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    // Usa forkJoin para executar ambas as chamadas de API ao mesmo tempo e aguardar que todas terminem.
    return forkJoin([pokemon, name]).subscribe({
      // Caso as chamadas sejam bem-sucedidas.
      next: (res) => {
        console.log('Estou no details com os dados: ', res); // Exibe os resultados no console.
        this.pokemon = res; // Armazena os dados recebidos no atributo 'pokemon'.
        this.isLoading = true; // Marca que o carregamento terminou.
        this.pokemonType = res[0].types[0].type.name;
        this.pokemonName = res[1].genera[8].genus;
        this.pokemonImg =
          res[0].sprites.other['official-artwork'].front_default;
        console.log('Tipo do pokemon: ', this.pokemonType);
        console.log(pokemon);
        console.log('Nome em japones');
        console.log(this.pokemonName);
        console.log('Imagem do pokemon');
        console.log(this.pokemonImg);
      },
      // Caso ocorra algum erro nas chamadas.
      error: () => {
        this.apiError = true; // Define que ocorreu um erro ao chamar a API.
      },
    });
  }
}
