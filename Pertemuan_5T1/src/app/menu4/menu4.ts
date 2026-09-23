import { Component, inject } from '@angular/core';
import { Menu4Option, Menu4SelectionService } from './menu4-selection.service';

@Component({
  selector: 'app-menu4',
  standalone: true,
  styleUrl: './menu4.css',
  templateUrl: './menu4.html',
})
export class Menu4 {
  private readonly menu4Selection = inject(Menu4SelectionService);
  readonly selectedMenu = this.menu4Selection.selectedMenu;

  selectMenu(option: Menu4Option): void {
    this.menu4Selection.select(option);
  }
}
