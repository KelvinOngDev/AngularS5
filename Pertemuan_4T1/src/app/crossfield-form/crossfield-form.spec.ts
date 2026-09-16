import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossfieldForm } from './crossfield-form';

describe('CrossfieldForm', () => {
  let component: CrossfieldForm;
  let fixture: ComponentFixture<CrossfieldForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrossfieldForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CrossfieldForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
