import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgStyle } from '@angular/common';
import { Highlight } from './highlight';
import {
  CurrencyPipe, DatePipe, JsonPipe,
  TitleCasePipe, registerLocaleData
} from '@angular/common';
import localeId from '@angular/common/locales/id';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe, DatePipe,
    JsonPipe, TitleCasePipe],
  templateUrl: './invoice.html',
})
export class Invoice {
  customer = 'Kelvin Ong';
  total = 1_999_000;
  issuedAt = new Date();
  invoice = { nomor: 'INV-000', status: 'Lunas' };
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgClass, NgStyle, Highlight, Invoice],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  userName: string = 'Kelvin Ong';
  isActive: boolean = false;
  fontSize: number = 16;

  toggleActive() {
    this.isActive = !this.isActive;
  }

  highlightColor = signal('#B2EBF2'); 
}

/* Pipe */
registerLocaleData(localeId);
