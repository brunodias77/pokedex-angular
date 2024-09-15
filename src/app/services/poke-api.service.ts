// Importações necessárias para o serviço
import { Injectable } from '@angular/core'; // Fornece o decorator Injectable para permitir a injeção de dependências
import { HttpClient } from '@angular/common/http'; // Serviço HTTP para realizar requisições HTTP
import { map, Observable, tap } from 'rxjs'; // Operadores do RxJS para manipular fluxos de dados assíncronos

// Define que o serviço pode ser injetado em toda a aplicação
@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  // URL base para a API de Pokémon com um limite de 6 pokémons
  private apiUrl: string =
    'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=21';

  // Construtor que injeta o serviço HttpClient para realizar requisições HTTP
  constructor(private http: HttpClient) {}

  // Método getter que retorna um Observable contendo a lista de todos os pokémons
  get apiListAllPokemons(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      // O operador 'tap' permite executar uma ação com os dados recebidos sem alterá-los
      tap((res) => {
        // Itera sobre os resultados da lista de pokémons
        res.results.map((resPokemons: any) => {
          // Para cada Pokémon, faz uma requisição para obter mais detalhes
          this.apiGetPokemon(resPokemons.url).subscribe(
            (res) => (resPokemons.status = res) // Salva os detalhes do Pokémon no objeto original
          );
        });
      })
    );
  }

  // Método público que faz uma requisição HTTP para obter detalhes de um Pokémon específico
  public apiGetPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      // O operador 'map' transforma a resposta e a retorna
      map((res) => res)
    );
  }
}
