import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rupiah',
  standalone: true
})
export class RupiahPipe implements PipeTransform {
  transform(value: number): string {
    return 'Rp ' + value.toLocaleString('id-ID');
  }
}