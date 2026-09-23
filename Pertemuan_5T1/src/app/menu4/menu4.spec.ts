import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu4 } from './menu4';

describe('Menu4', () => {
  let component: Menu4;
  let fixture: ComponentFixture<Menu4>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu4],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu4);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
