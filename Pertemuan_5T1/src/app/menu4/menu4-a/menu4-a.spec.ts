import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu4A } from './menu4-a';

describe('Menu4A', () => {
  let component: Menu4A;
  let fixture: ComponentFixture<Menu4A>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu4A],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu4A);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
