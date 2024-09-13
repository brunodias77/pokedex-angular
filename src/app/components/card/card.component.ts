import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card', // Define o seletor HTML para o componente
  standalone: true, // Componente standalone, pode ser utilizado sem um módulo específico
  imports: [], // Não há módulos sendo importados aqui
  templateUrl: './card.component.html', // Caminho para o template HTML
  styleUrls: ['./card.component.scss'], // Caminho para o arquivo de estilos (corrigido de styleUrl para styleUrls)
})
export class CardComponent {
  // O decorator @Input() permite que o componente receba dados de fora, neste caso, um objeto 'pokemon'
  @Input() pokemon: any;
}
