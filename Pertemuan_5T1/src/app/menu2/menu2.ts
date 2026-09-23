import { Component } from '@angular/core';

@Component({
  selector: 'app-menu2',
  standalone: true,
  styleUrl: './menu2.css',
  templateUrl: './menu2.html',
})
export class Menu2 {
  rows = [
    { name: 'Alpha', status: 'Active', amount: '$12.4K' },
    { name: 'Bravo', status: 'Pending', amount: '$6.2K' },
    { name: 'Charlie', status: 'Review', amount: '$9.1K' },
  ];
}
