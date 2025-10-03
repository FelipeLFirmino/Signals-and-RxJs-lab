import { Component, computed, input, output, signal } from '@angular/core';
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { BaseItem } from '../../model/baseItem.interface';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'app-reusable-wizard-select-step',
  imports: [SearchbarComponent, CardComponent],
  templateUrl: './reusable-wizard-select-step.component.html',
  styleUrl: './reusable-wizard-select-step.component.css'
})
export class ReusableWizardSelectStepComponent<T extends BaseItem> {
  //Dados completos (vem de request) 
  allDataList = input.required<T[]>(); 
  
  //Elementos que já estão selecionados(vem de request mas e opcional, se nao for dito sera um array vazio como default)
  selectedDataList = input<T[]>([]); 
  
  //Quais chaves do objeto usar para a busca
  searchKeys = input.required<string[]>();
  
  // Emite a lista completa de selecionados após um clique
  selectedDataChange = output<T[]>(); 
  
  
  readonly searchFilteredList = signal<T[]>([]); 
  // Controle de paginação
  readonly pageSize = signal(10);
  readonly currentPageOffset = signal(0); 


  readonly selectedIdsSet = computed(() => {
    return new Set(this.selectedDataList().map(element => element.id));
  });

  //Lista a ser ORDENADA (Reage ao input de dados e ao filtro)
  readonly orderedList = computed(() => {
    const list = this.searchFilteredList().length > 0 ? this.searchFilteredList() : this.allDataList();
    const selectedIds = this.selectedIdsSet();
    
    // REORDENAÇÃO Selecionados primeiro
    return [...list].sort((a, b) => {
      const aIsSelected = selectedIds.has(a.id);
      const bIsSelected = selectedIds.has(b.id);
      return (bIsSelected ? 1 : 0) - (aIsSelected ? 1 : 0);
    });
  });

  //Lista Exibida
  readonly displayedList = computed(() => {
    const offset = this.currentPageOffset();
    const size = this.pageSize();
    return this.orderedList().slice(0, offset + size); 
  });
  
  readonly hasMoreItems = computed(() => 
    this.orderedList().length > this.displayedList().length
  );
  
  readonly stepIsValid = computed(() => this.selectedDataList().length > 0);

  // Recebe a lista filtrada do SearchbarComponent
  handleFilteredData(list: T[]): void {
    this.searchFilteredList.set(list);
    // Reinicia a paginação ao filtrar
    this.currentPageOffset.set(this.pageSize());
  }
  
  // Disparado ao clicar em um Card
  toggleSelection(element: T): void {
    const selectedIds = this.selectedIdsSet();
    
    // Calcula a nova lista de selecionados de forma imutável
    const updatedList = selectedIds.has(element.id)
      ? this.selectedDataList().filter(e => e.id !== element.id) // Deseleciona
      : [...this.selectedDataList(), element];                    // Seleciona

    this.selectedDataChange.emit(updatedList);
    this.currentPageOffset.set(this.pageSize()); 
  }
  
  loadMoreItems(): void {
    this.currentPageOffset.update(offset => offset + this.pageSize());
  }
}
