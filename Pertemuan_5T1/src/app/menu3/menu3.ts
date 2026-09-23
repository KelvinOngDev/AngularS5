import { Component } from '@angular/core';

@Component({
  selector: 'app-menu3',
  standalone: true,
  styleUrl: './menu3.css',
  templateUrl: './menu3.html',
})
export class Menu3 {
  items = [
    'Approve vendor contracts',
    'Check customer retention status',
    'Review onboarding checklist',
  ];
}
