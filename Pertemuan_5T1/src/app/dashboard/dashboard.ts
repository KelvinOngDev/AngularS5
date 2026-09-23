import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  stats = [
    { title: 'Total Revenue', value: '$24.8K', change: '+12.5%', tone: 'positive' },
    { title: 'Orders', value: '1,284', change: '+8.1%', tone: 'positive' },
    { title: 'Visitors', value: '16.3K', change: '-2.4%', tone: 'negative' },
    { title: 'Conversion', value: '4.8%', change: '+0.9%', tone: 'positive' },
  ];

  activities = [
    { title: 'New customer signup', detail: 'Alice Johnson joined the premium plan', time: '2 hours ago' },
    { title: 'Inventory update', detail: 'Stock levels were synced across 3 warehouses', time: '5 hours ago' },
    { title: 'Weekly report generated', detail: 'Finance dashboard refreshed for Monday review', time: 'Yesterday' },
  ];

  tasks = [
    'Review sales pipeline',
    'Prepare client onboarding',
    'Approve marketing budget',
    'Update product catalog',
  ];
}
