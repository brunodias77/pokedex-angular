import { Injectable } from '@angular/core'; // Fornece o decorator Injectable para permitir a injeção de dependências
import { HttpClient } from '@angular/common/http'; // Serviço HTTP para realizar requisições HTTP
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs'; // Operadores do RxJS para manipular fluxos de dados assíncronos

interface PokemonEvolutionsProps {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private pokemonEvolutionList: PokemonEvolutionsProps[] = [];

  constructor(private http: HttpClient) {}

  // Método para listar pokémons com paginação
  getPokemonList(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}/?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      tap((res) => {
        res.results.map((resPokemons: any) => {
          this.apiGetPokemon(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res)
          );
        });
      })
    );
  }

  // Método público para obter detalhes de um Pokémon específico
  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public getPokemonEvolutions(
    evolutionUrl: string
  ): Observable<PokemonEvolutionsProps[]> {
    console.log('executando getPokemonEvolutions');

    return this.http.get<any>(evolutionUrl).pipe(
      switchMap((data) => {
        const evolutionRequests = [
          this.apiGetPokemon(`${this.apiUrl}/${data.chain.species.name}`),
          this.apiGetPokemon(
            `${this.apiUrl}/${data.chain.evolves_to[0]?.species.name || ''}`
          ),
          this.apiGetPokemon(
            `${this.apiUrl}/${
              data.chain.evolves_to[0]?.evolves_to[0]?.species.name || ''
            }`
          ),
        ];

        return forkJoin(evolutionRequests); // Retorna um Observable que emite um array com os resultados das requisições
      }),
      map((results) => {
        this.pokemonEvolutionList = results.map((res) => {
          const image =
            res.sprites?.other?.['official-artwork']?.front_default || ''; // Verifica se as propriedades existem
          return {
            name: res.name,
            url: image,
          };
        });
        return this.pokemonEvolutionList; // Retorna a lista de evoluções
      }),
      catchError((error) => {
        console.error('Erro ao buscar dados:', error);
        return of([]); // Retorna um array vazio em caso de erro
      })
    );
  }
}
