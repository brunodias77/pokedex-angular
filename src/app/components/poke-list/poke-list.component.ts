import { Component, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-poke-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public pokemons: any;
  public isLoading: boolean = true; // Variável de controle de loading

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    // Chama o método da API e define o loading como falso após receber os dados
    this.pokeApiService.apiListAllPokemons.subscribe((data) => {
      this.pokemons = data.results;
      this.isLoading = false; // Quando os dados são carregados, o loading para
      console.log('data', data.results);
    });
  }
}
