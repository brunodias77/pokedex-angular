import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokeApiService } from '../../services/poke-api.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { POKEMON_TYPES } from '../../models/pokemon-types';
import { CardEvolutionComponent } from "../../components/card-evolution/card-evolution.component";

interface PokemonType {
  type: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
}

interface PokemonDetails {
  pokemon: any; // Pode ser melhorado com um tipo específico.
  species: any; // Pode ser melhorado com um tipo específico.
}

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule, CardEvolutionComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'], // Corrigido para 'styleUrls'.
})
export class DetailsComponent implements OnInit {
  private readonly urlPokemon = 'https://pokeapi.co/api/v2/pokemon';
  private readonly urlName = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: PokemonDetails | null = null;
  public isLoading = false;
  public apiError = false;
  public pokemonType = '';
  public pokemonName = '';
  public pokemonImg = '';
  public abilities: Ability[] = [];
  public height = 0;
  public weight = 0;
  public pokemonStats: any[] = []; // Melhore com um tipo específico
  public pokemonBio = '';
  public pokemonTypes: PokemonType[] = [];
  public pokemonHabilities: Ability[] = [];
  public pokemonEvolutions: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private pokeApiService: PokeApiService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  private getPokemon(): void {
    const id = this.activeRoute.snapshot.params['id'];

    const pokemonRequest = this.pokeApiService.apiGetPokemon(
      `${this.urlPokemon}/${id}`
    );
    const speciesRequest = this.pokeApiService.apiGetPokemon(
      `${this.urlName}/${id}`
    );

    forkJoin([pokemonRequest, speciesRequest]).subscribe({
      next: (res) => this.handlePokemonResponse(res),
      error: () => (this.apiError = true),
    });
  }

  private handlePokemonResponse([pokemonData, speciesData]: [any, any]): void {
    this.pokemon = { pokemon: pokemonData, species: speciesData };
    this.isLoading = true;
    console.log('Detalhes pokemon');
    console.log(this.pokemon);
    console.log(this.pokemon.species.evolution_chain.url);

    this.pokemonType = pokemonData.types[0].type.name;
    this.pokemonName = speciesData.genera[8].genus;
    this.pokemonImg =
      pokemonData.sprites.other['official-artwork'].front_default;
    this.abilities = pokemonData.abilities;
    this.height = pokemonData.height;
    this.weight = pokemonData.weight;
    this.pokemonStats = pokemonData.stats;
    this.pokemonBio = speciesData.flavor_text_entries[3].flavor_text;
    this.pokemonTypes = pokemonData.types;
    this.pokemonHabilities = pokemonData.abilities;

    this.logPokemonDetails();

    // Obtenha as evoluções do Pokémon
    this.pokeApiService
      .getPokemonEvolutions(this.pokemon.species.evolution_chain.url)
      .subscribe({
        next: (evolutions) => {
          this.pokemonEvolutions = evolutions;
          console.log('Evoluções do Pokémon no details_component:', this.pokemonEvolutions);
        },
        error: () => {
          console.error('Erro ao obter evoluções do Pokémon');
          this.pokemonEvolutions = []; // Inicializa como array vazio em caso de erro
        },
      });
  }

  private logPokemonDetails(): void {
    console.log('Detalhes do Pokémon:', {
      tipo: this.pokemonType,
      nome: this.pokemonName,
      imagem: this.pokemonImg,
      habilidades: this.abilities,
      altura: this.height,
      peso: this.weight,
      status: this.pokemonStats,
      biografia: this.pokemonBio,
      tipos: this.pokemonTypes,
      habilidadesPokemon: this.pokemonHabilities,
    });
  }

  public getColorForType(type: string): string {
    const typeData = POKEMON_TYPES.find((t) => t.type === type);
    return typeData ? typeData.data.color : '#000';
  }

  getBackgroundClass(type: string): string | boolean {
    return (
      {
        'bg-fire': type === 'fire',
        'bg-water': type === 'water',
        'bg-dragon': type === 'dragon',
        'bg-electric': type === 'electric',
        'bg-fairy': type === 'fairy',
        'bg-ghost': type === 'ghost',
        'bg-ice': type === 'ice',
        'bg-grass': type === 'grass',
        'bg-bug': type === 'bug',
        'bg-fighting': type === 'fighting',
        'bg-normal': type === 'normal',
        'bg-dark': type === 'dark',
        'bg-rock': type === 'rock',
        'bg-psychic': type === 'psychic',
        'bg-flying': type === 'flying',
        'bg-poison': type === 'poison',
        'bg-ground': type === 'ground',
        'bg-steel': type === 'steel',
      }[type] || ''
    ); // Retorna uma string vazia se não encontrar
  }

  getTextClass(type: string): string | boolean {
    return (
      {
        'text-fire': type === 'fire',
        'text-water': type === 'water',
        'text-dragon': type === 'dragon',
        'text-electric': type === 'electric',
        'text-fairy': type === 'fairy',
        'text-ghost': type === 'ghost',
        'text-ice': type === 'ice',
        'text-grass': type === 'grass',
        'text-bug': type === 'bug',
        'text-fighting': type === 'fighting',
        'text-normal': type === 'normal',
        'text-dark': type === 'dark',
        'text-rock': type === 'rock',
        'text-psychic': type === 'psychic',
        'text-flying': type === 'flying',
        'text-poison': type === 'poison',
        'text-ground': type === 'ground',
        'text-steel': type === 'steel',
      }[type] || ''
    ); // Retorna uma string vazia se não encontrar
  }
}
