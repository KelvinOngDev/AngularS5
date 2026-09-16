import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h3>1. Validate Form</h3>
    <form [formGroup]="validateForm" (ngSubmit)="onSubmit()">
      
      <label for="email">Email Address:</label>
      <input id="email" type="text" formControlName="email">
      
      <!-- Show errors only if the user has interacted with the field -->
      @if (emailControl?.invalid && (emailControl?.dirty || emailControl?.touched)) {
        <div style="color: red;">
          @if (emailControl?.hasError('required')) { <p>Email is required.</p> }
          @if (emailControl?.hasError('email')) { <p>Must be a valid email format.</p> }
        </div>
      }

      <br><br>
      <button type="submit" [disabled]="validateForm.invalid">Submit</button>
    </form>
  `
})
export class ValidateForm {
  private fb = inject(FormBuilder);

  validateForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  get emailControl() {
    return this.validateForm.get('email');
  }

  onSubmit() {
    console.log('Validate Form Data:', this.validateForm.getRawValue());
  }
}