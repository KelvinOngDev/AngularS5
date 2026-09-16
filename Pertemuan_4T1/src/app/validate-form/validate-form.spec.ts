import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateForm } from './validate-form';

describe('ValidateForm', () => {
  let component: ValidateForm;
  let fixture: ComponentFixture<ValidateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
