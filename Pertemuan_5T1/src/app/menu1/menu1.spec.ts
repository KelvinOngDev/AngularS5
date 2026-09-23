import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu1 } from './menu1';

describe('Menu1', () => {
  let component: Menu1;
  let fixture: ComponentFixture<Menu1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu1],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
