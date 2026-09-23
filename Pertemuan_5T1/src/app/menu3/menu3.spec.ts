import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu3 } from './menu3';

describe('Menu3', () => {
  let component: Menu3;
  let fixture: ComponentFixture<Menu3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu3],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
