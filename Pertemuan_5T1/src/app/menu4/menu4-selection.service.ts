import { Injectable, signal } from '@angular/core';

export type Menu4Option = 'a' | 'b';

@Injectable({ providedIn: 'root' })
export class Menu4SelectionService {
  selectedMenu = signal<Menu4Option>('a');

  select(menu: Menu4Option): void {
    this.selectedMenu.set(menu);
  }
}