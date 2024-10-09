import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-evolution',
  standalone: true,
  imports: [],
  templateUrl: './card-evolution.component.html',
  styleUrl: './card-evolution.component.scss',
})
export class CardEvolutionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  @Input() pokemon: any;
}
