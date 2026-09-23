import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Menu4Option, Menu4SelectionService } from '../../menu4/menu4-selection.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  styleUrl: './sidebar.css',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  private readonly menu4Selection = inject(Menu4SelectionService);

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '⌂' },
    { label: 'Menu 1', path: '/menu1', icon: '◫' },
    { label: 'Menu 2', path: '/menu2', icon: '▣' },
    { label: 'Menu 3', path: '/menu3', icon: '◎' },
    {
      label: 'Menu 4',
      path: '/menu4',
      icon: '◈',
      children: [
        { label: 'Menu A', path: '/menu4', option: 'a' as Menu4Option },
        { label: 'Menu B', path: '/menu4', option: 'b' as Menu4Option },
      ],
    },
  ];

  selectMenu4(option: Menu4Option): void {
    this.menu4Selection.select(option);
  }
}
