import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-cross-field-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h3>3. Cross Field Validator Form</h3>
    <form [formGroup]="crossFieldForm" (ngSubmit)="onSubmit()">
      
      <label for="password">Password:</label>
      <input id="password" type="password" formControlName="password">
      <br><br>

      <label for="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" type="password" formControlName="confirmPassword">
      <br><br>

      <!-- Check the error on the whole form group -->
      @if (crossFieldForm.hasError('passwordMismatch') && crossFieldForm.touched) {
        <p style="color: red;">Passwords do not match!</p>
      }

      <button type="submit" [disabled]="crossFieldForm.invalid">Submit</button>
    </form>
  `
})
export class CrossfieldForm {
  private fb = inject(FormBuilder);

  crossFieldForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  onSubmit() {
    console.log('Cross Field Form Data:', this.crossFieldForm.getRawValue());
  }
}