import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { POKEMON_TYPES } from '../../models/pokemon-types';
@Component({
  selector: 'app-card', // Define o seletor HTML para o componente
  standalone: true, // Componente standalone, pode ser utilizado sem um módulo específico
  imports: [CommonModule], // Não há módulos sendo importados aqui
  templateUrl: './card.component.html', // Caminho para o template HTML
  styleUrls: ['./card.component.scss'], // Caminho para o arquivo de estilos (corrigido de styleUrl para styleUrls)
})
export class CardComponent {
  // O decorator @Input() permite que o componente receba dados de fora, neste caso, um objeto 'pokemon'
  @Input() pokemon: any;

  getColorForType(type: string): string {
    const typeData = POKEMON_TYPES.find((t) => t.type === type);
    return typeData ? typeData.data.color : '#000'; // Cor padrão se não encontrado
  }
  getIconForType(type: string): string {
    const typeData = POKEMON_TYPES.find((t) => t.type === type);
    return typeData ? typeData.data.icon : ''; // Ícone padrão se não encontrado
  }
  getColorAndIconForType(type: string): any {
    const typeData = POKEMON_TYPES.find((t) => t.type === type);
    return typeData ? typeData : ''; // Ícone padrão se não encontrado
  }
}
