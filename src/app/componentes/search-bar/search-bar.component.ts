import { Component, EventEmitter, Output } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonSearchbar]
})
export class SearchBarComponent {

  @Output() searchChange = new EventEmitter<string>();

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();
    this.searchChange.emit(value);
  }
}
