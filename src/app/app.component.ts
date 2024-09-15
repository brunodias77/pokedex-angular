import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Corrigido para 'styleUrls'
})
export class AppComponent {
  title = 'pokedex-angular';
  public navigations = [
    // Corrigido o nome de 'navigation' para 'navigations'
    {
      title: 'Agua',
      url: '/home',
      icon: 'assets/icons/blue/water_blue.svg', // Certifique-se de usar o caminho correto para os ícones
    },
    {
      title: 'Dragão',
      url: '/pokemons',
      icon: 'assets/icons/blue/dragon_blue.svg',
    },
    {
      title: 'Eletrico',
      url: '/about',
      icon: 'assets/icons/blue/electric_blue.svg',
    },
    {
      title: 'Fada',
      url: '/about',
      icon: 'assets/icons/blue/fairy_blue.svg',
    },
    {
      title: 'Fantasma',
      url: '/about',
      icon: 'assets/icons/blue/ghost_blue.svg',
    },
    {
      title: 'Fogo',
      url: '/about',
      icon: 'assets/icons/blue/fire_blue.svg',
    },
    {
      title: 'Gelo',
      url: '/about',
      icon: 'assets/icons/blue/ice_blue.svg',
    },
    {
      title: 'Grama',
      url: '/about',
      icon: 'assets/icons/blue/grass_blue.svg',
    },
    {
      title: 'Inseto',
      url: '/about',
      icon: 'assets/icons/blue/bug_blue.svg',
    },
    {
      title: 'Lutador',
      url: '/about',
      icon: 'assets/icons/blue/fighting_blue.svg',
    },
    {
      title: 'Normal',
      url: '/about',
      icon: 'assets/icons/blue/normal_blue.svg',
    },
    {
      title: 'Sombrio',
      url: '/about',
      icon: 'assets/icons/blue/dark_blue.svg',
    },
    {
      title: 'Aço',
      url: '/about',
      icon: 'assets/icons/blue/steel_blue.svg',
    },
    {
      title: 'Pedra',
      url: '/about',
      icon: 'assets/icons/blue/rock_blue.svg',
    },
    {
      title: 'Psiquico',
      url: '/about',
      icon: 'assets/icons/blue/psychic_blue.svg',
    },
    {
      title: 'Terra',
      url: '/about',
      icon: 'assets/icons/blue/ground_blue.svg',
    },
    {
      title: 'Venenoso',
      url: '/about',
      icon: 'assets/icons/blue/poison_blue.svg',
    },
    {
      title: 'Voador',
      url: '/about',
      icon: 'assets/icons/blue/flying_blue.svg',
    },
  ];
}
