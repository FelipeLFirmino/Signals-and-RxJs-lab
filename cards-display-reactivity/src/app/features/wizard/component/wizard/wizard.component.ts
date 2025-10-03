// src/app/wizard/wizard.component.ts

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { WizardService } from '../../service/wizard.service';
import { DataElement } from '../../model/wizard.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs'; // Adicionado para carregar as duas APIs em ngOnInit

@Component({
  selector: 'app-wizard',
  standalone: true, // Componentes standalone são o padrão moderno
  imports: [CommonModule, FormsModule],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent implements OnInit {
  
  private wizardService = inject(WizardService);

  readonly allDataElements = signal<DataElement[]>([]);  
  readonly selectedDataElements = signal<DataElement[]>([]); 
  
  readonly searchTerm = signal<string>('');
  readonly pageSize = signal(10);
  readonly currentPageOffset = signal(5);

 //lista de Ids selecionadpos para evitar problemas de tipagem
  readonly selectedIdsSet = computed(() => {
    // Transforma a lista de objetos selecionados em um Set<number> para buscas O(1)
    return new Set(this.selectedDataElements().map(element => element.id));
  });

 

  // Lista Filtrada e Reordenada (Selecionados primeiro)(logica do searchbar)
  readonly filteredDataElements = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allItems = this.allDataElements();
    
    let itemsToFilter = allItems;
    
    // FILTRO
    if (term) {
      itemsToFilter = allItems.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.category.toLowerCase().includes(term) 
      );
    }
    
    // REORDENAÇÃO acontece no apos os itens selecionados serem encontrados
    return [...itemsToFilter].sort((a, b) => {
      const aIsSelected = this.isSelected(a.id);
      const bIsSelected = this.isSelected(b.id);
      // Coloca selecionados (true) antes de não selecionados (false)
      return (bIsSelected ? 1 : 0) - (aIsSelected ? 1 : 0);
    });
  });

  // Lista Exibida (Paginação)
  readonly displayedDataElements = computed(() => {
    const offset = this.currentPageOffset();
    const size = this.pageSize();
    return this.filteredDataElements().slice(0, offset + size); 
    
  });
  
  // Validação da Paginação ("Mostrar Mais")
  readonly hasMoreItems = computed(() => 
    this.filteredDataElements().length > this.displayedDataElements().length
  );

 private isSelected(itemId: number): boolean {
      return this.selectedIdsSet().has(itemId);
  }
  // ----------------------------------------------------
  // CICLO DE VIDA E MÉTODOS DE AÇÃO
  // ----------------------------------------------------

  ngOnInit(): void {
    // Usa forkJoin para carregar os dois endpoints de uma vez
    forkJoin({
      all: this.wizardService.getAllDataElements(),
      selectedDataElementResponse: this.wizardService.getSelectedDataElements()
    }).subscribe(({ all, selectedDataElementResponse }) => {
      this.allDataElements.set(all);
      this.selectedDataElements.set(selectedDataElementResponse); 
      this.currentPageOffset.set(this.pageSize());
    });

    console.log(this.allDataElements())
    console.log(this.selectedDataElements())
  
    setTimeout(()=>{
    console.log(this.filteredDataElements())
    console.log(this.displayedDataElements())
    },3000)
    

  }

  toggleSelection(element: DataElement): void {
    const selectedIds = this.selectedIdsSet();
    
    this.selectedDataElements.update(currentList => {
        if (selectedIds.has(element.id)) {
            // Deselecionar: remove o elemento da lista
            return currentList.filter(e => e.id !== element.id);
        } else {
            // Selecionar: adiciona o elemento completo à lista
            return [...currentList, element];
        }
    });
    
    // Reseta o offset para forçar a reordenação na lista
    this.currentPageOffset.set(this.pageSize()); 
  }

  loadMoreItems(): void {
    this.currentPageOffset.update(offset => offset + this.pageSize());
  }

  updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
    this.currentPageOffset.set(this.pageSize());
  }
}