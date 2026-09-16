import { Component } from '@angular/core';
import { ValidateForm } from './validate-form/validate-form'; 
import { DynamicForm } from './dynamic-form/dynamic-form';
import { CrossfieldForm } from './crossfield-form/crossfield-form';
import { RegistrationForm } from './registration-form/registration-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ValidateForm, 
    DynamicForm, 
    CrossfieldForm,
    RegistrationForm
  ],
  template: `
    <div style="font-family: sans-serif; padding: 20px;">
      <h1>Pertemuan 4 - Reactive Forms Tasks</h1>
      
      <hr style="margin: 20px 0;">
      <!-- Validate Form -->
      <app-validate-form></app-validate-form> 
      
      <hr style="margin: 20px 0;">
      <!-- Building Dynamic Forms -->
      <app-dynamic-form></app-dynamic-form>
      
      <hr style="margin: 20px 0;">
      <!-- Cross Field Validator Form -->
      <app-cross-field-form></app-cross-field-form>

      <hr style="margin: 20px 0;">
      <!-- Mini Project -->
      <app-registration-form></app-registration-form>
    </div>
  `
})

export class App {}
