import { Component, inject, signal } from '@angular/core';
import { WizardService } from '../../../wizard/service/wizard.service';
import { DataElement } from '../../../wizard/model/wizard.model';
import { forkJoin } from 'rxjs';
import { ReusableWizardSelectStepComponent } from "../../../reusable-wizard-select-step/component/reusable-wizard-select-step/reusable-wizard-select-step.component";

@Component({
  selector: 'app-process-wizard',
  imports: [ReusableWizardSelectStepComponent],
  templateUrl: './process-wizard.component.html',
  styleUrl: './process-wizard.component.css'
})
export class ProcessWizardComponent {
  private wizardService = inject(WizardService);

  readonly allDataElements = signal<DataElement[]>([]);
  readonly selectedElementsList = signal<DataElement[]>([]); 
  readonly searchKeys = ['name', 'category', 'description'];

  ngOnInit(): void {
    forkJoin({
      all: this.wizardService.getAllDataElements(),
      selected: this.wizardService.getSelectedDataElements()
    }).subscribe(({ all, selected }) => {
      this.allDataElements.set(all);
      this.selectedElementsList.set(selected); 
    });
  }


  /**
   * Atualiza o estado da lista de selecionados. 
   * Esta função é disparada pelo output do componente ReusableStepOrchestrator.
   * @param updatedList A nova lista de elementos selecionados.
   */
  handleSelectionChange(updatedList: DataElement[]): void {
    this.selectedElementsList.set(updatedList);
    
    // TODO: Adicionar lógica de negócios aqui, como salvar no backend ou 
    // navegar para o próximo passo do wizard.
    console.log(`Nova contagem de itens selecionados: ${updatedList.length}`);
  }
}
