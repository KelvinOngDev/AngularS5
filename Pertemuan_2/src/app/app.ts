import { Component, signal } from '@angular/core';
import { Header } from './header/header';
import { Home } from './home/home';
import { About } from './about/about';
import { Contactus } from './contactus/contactus';

@Component({
  selector: 'app-root',
  imports: [ Header, Home, About, Contactus],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Pertemuan_2');
}