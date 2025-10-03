import { Component, input, output } from '@angular/core';

interface cardElement {
  id: number;
  name: string;
  category?:string;
  description?:string;
  [key: string]: any;
}

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent<T extends cardElement> {
  data = input.required<T>()
  isSelected = input.required<boolean>()
  cardClickedOutput = output<number>()


  cardClicked(dataId: number){
    this.cardClickedOutput.emit(dataId)
  }
}

