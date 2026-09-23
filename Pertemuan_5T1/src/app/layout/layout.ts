import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Header, Sidebar, RouterOutlet],
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {}
