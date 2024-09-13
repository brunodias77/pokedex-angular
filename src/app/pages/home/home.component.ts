import { Component } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { PokeListComponent } from "../../components/poke-list/poke-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, PokeListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
