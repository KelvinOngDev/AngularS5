import { Component } from '@angular/core';
import { RupiahPipe } from './pipes/rupiah-pipe';
import { CategoryPipe } from './pipes/category-pipe';
import { AmountColorDirective } from './directives/amount-color';
import { Expense } from './models/expense.model';

@Component({
selector: 'app-root',
standalone: true,
imports: [ RupiahPipe, CategoryPipe, AmountColorDirective ],
templateUrl: './app.html'
})
export class App {
expenses: Expense[] = [
{ title: 'Beli Beras', category: 'food', amount: 200000 },
{ title: 'Bayar Internet', category: 'utility', amount: 500000 },
{ title: 'Nonton Bioskop', category: 'entertainment', amount: 150000 }
];
}