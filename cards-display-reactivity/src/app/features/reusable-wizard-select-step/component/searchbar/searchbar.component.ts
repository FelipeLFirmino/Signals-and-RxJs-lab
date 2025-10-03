import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseItem } from '../../model/baseItem.interface';



@Component({
  selector: 'app-searchbar',
  imports: [FormsModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})

export class SearchbarComponent<T extends BaseItem> {
  data = input.required<T[]>();
  searchKeys = input.required<string[]>()

  filteredDataOutput = output<T[]>()
  
  readonly searchTerm = signal<string>('');
  
  
  readonly filteredDataForOutput = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const allItems = this.data();
    const keys = this.searchKeys();

    if (!term || !keys.length) {
      return allItems;
    }

    const filtered = allItems.filter(item => {
      return keys.some(key => {
        const value = item[key];
        if (value !== null && value !== undefined) {
          return String(value).toLowerCase().includes(term);
        }
        return false;
      });
    });
    return filtered
  });

    updateSearchTerm(term: string): void {
    this.searchTerm.set(term);
    
    this.filteredDataOutput.emit(this.filteredDataForOutput());
  }

}
