import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAmountColor]',
  standalone: true
})
export class AmountColorDirective implements OnChanges {
  @Input() appAmountColor!: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appAmountColor > 300000) {
      this.el.nativeElement.style.color = 'red';
    } else {
      this.el.nativeElement.style.color = 'green';
    }
  }
}