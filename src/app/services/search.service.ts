// Importa o decorador Injectable do Angular para que este serviço possa ser injetado em outros componentes ou serviços
import { Injectable } from '@angular/core';

// Importa BehaviorSubject da biblioteca RxJS, que é um tipo especial de Subject que mantém o valor atual e pode emitir novos valores ao longo do tempo
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Fornece o serviço na raiz do aplicativo, tornando-o disponível globalmente sem precisar registrá-lo em módulos específicos
})
export class SearchService {
  // Cria uma instância de BehaviorSubject que armazena o termo de busca atual. Inicializa com uma string vazia ('')
  private searchTerm = new BehaviorSubject<string>('');

  // Exponibiliza o BehaviorSubject como um Observable, permitindo que outros componentes possam se inscrever e reagir a mudanças no termo de busca
  currentSearchTerm = this.searchTerm.asObservable();

  // Construtor vazio, mas necessário para injeção de dependências no Angular, mesmo que não haja dependências a serem injetadas aqui
  constructor() {}

  // Método público que permite alterar o valor do termo de busca
  // O valor é atualizado usando o método `next` do BehaviorSubject, que emite o novo valor para todos os inscritos
  changeSearchTerm(term: string) {
    this.searchTerm.next(term);
  }
}
