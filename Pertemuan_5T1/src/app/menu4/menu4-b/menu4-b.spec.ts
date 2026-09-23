import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu4B } from './menu4-b';

describe('Menu4B', () => {
  let component: Menu4B;
  let fixture: ComponentFixture<Menu4B>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu4B],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu4B);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
