import { Component } from '@angular/core';

@Component({
  selector: 'app-menu1',
  standalone: true,
  styleUrl: './menu1.css',
  templateUrl: './menu1.html',
})
export class Menu1 {
  cards = [
    { title: 'Projects', value: '28', text: 'Active client work' },
    { title: 'Team', value: '12', text: 'People online today' },
    { title: 'Issues', value: '9', text: 'Needs attention' },
  ];
}
