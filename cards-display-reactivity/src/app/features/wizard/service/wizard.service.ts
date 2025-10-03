import { Injectable } from '@angular/core';
import { DataElement } from '../model/wizard.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {
   // Dados mockados que simulam o retorno da API
  private mockDataElements: DataElement[] = [
    { id: 1, name: 'Nome Completo', category: 'Identificação', description: 'Nome e Sobrenome do titular.' },
    { id: 2, name: 'CPF', category: 'Identificação', description: 'Cadastro de Pessoa Física.' },
    { id: 3, name: 'Endereço Residencial', category: 'Localização', description: 'Rua, número, cidade, estado.' },
    { id: 4, name: 'Email Pessoal', category: 'Contato', description: 'Endereço de correio eletrônico.' },
    { id: 5, name: 'Telefone Celular', category: 'Contato', description: 'Número de telefone/celular.' },
    { id: 6, name: 'Data de Nascimento', category: 'Biográficos', description: 'Dia, mês e ano de nascimento.' },
    { id: 7, name: 'RG', category: 'Identificação', description: 'Registro Geral.' },
    { id: 8, name: 'Estado Civil', category: 'Biográficos', description: 'Solteiro, casado, etc.' },
    { id: 9, name: 'Gênero', category: 'Biográficos', description: 'Gênero auto-declarado.' },
    { id: 10, name: 'Salário', category: 'Financeiro', description: 'Remuneração mensal.' },
    { id: 11, name: 'Placa do Veículo', category: 'Veicular', description: 'Identificação do veículo.' },
    { id: 12, name: 'Histórico de Compras', category: 'Consumo', description: 'Itens comprados no último ano.' },
    { id: 13, name: 'IP', category: 'Digital', description: 'Endereço IP de acesso.' },
    { id: 14, name: 'Geo-localização', category: 'Localização', description: 'Coordenadas atuais.' },
    { id: 15, name: 'Formação Acadêmica', category: 'Profissional', description: 'Nível de escolaridade.' },
    // Mais 15 itens genéricos para completar os 30
    ...Array.from({ length: 15 }, (_, i) => ({ 
      id: i + 16, 
      name: `Dado Padrão ${i + 1}`, 
      category: i % 3 === 0 ? 'Outros A' : i % 3 === 1 ? 'Outros B' : 'Outros C', 
      description: `Informação genérica ${i + 1}.`, 
    }))
  ];

   private mockSelectedDataElements: DataElement[] = [
    { id: 2, name: 'CPF', category: 'Identificação', description: 'Cadastro de Pessoa Física.' },
    { id: 4, name: 'Email Pessoal', category: 'Contato', description: 'Endereço de correio eletrônico.' },
    { id: 5, name: 'Telefone Celular', category: 'Contato', description: 'Número de telefone/celular.' },
    { id: 13, name: 'IP', category: 'Digital', description: 'Endereço IP de acesso.' },]

   getAllDataElements(): Observable<DataElement[]> {
    return of(this.mockDataElements);
  }

    getSelectedDataElements():Observable<DataElement[]>{
      return of(this.mockSelectedDataElements)
    } 

  }
