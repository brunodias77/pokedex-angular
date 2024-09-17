import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';
  public pokemon: any;
  public isLoading: boolean = false;
  public apiError: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}
  ngOnInit(): void {
    this.getPokemon;
  }
  get getPokemon() {
    const id = this.activeRoute.snapshot.params['id'];
    const pokemon = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${id}`
    );
    const name = this.pokeApiService.apiGetPokemon(`${this.urlName}/${id}`);

    console.log(id);
    console.log(pokemon);
    console.log(name);
    return forkJoin([pokemon, name]).subscribe({
      next: (res) => {
        console.log('Estou no details com os dados: ', res);
        this.pokemon = res;
        this.isLoading = true;
      },
      error: () => {
        this.apiError = true;
      },
    });
  }
}
