import { Component, signal } from '@angular/core';
import { About } from './about/about';
import { Footer } from './footer/footer';
import { Hero } from './hero/hero';
import { Menu } from './menu/menu';

@Component({
  selector: 'app-root',
  imports: [About, Footer, Hero, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Pertemuan_2T2');
}
