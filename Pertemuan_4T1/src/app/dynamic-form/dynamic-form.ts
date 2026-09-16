import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h3>2. Building Dynamic Forms</h3>
    <form [formGroup]="dynamicForm" (ngSubmit)="onSubmit()">
      
      <div formArrayName="hobbies">
        <button type="button" (click)="addHobby()">+ Add Hobby</button>
        
        <!-- Loop through the FormArray -->
        @for (hobby of hobbies.controls; track $index) {
          <div style="margin-top: 10px;">
            <label>Hobby {{ $index + 1 }}: </label>
            <input [formControlName]="$index" type="text">
            <button type="button" (click)="removeHobby($index)">Remove</button>
          </div>
        }
      </div>

      <br>
      <button type="submit" [disabled]="dynamicForm.invalid">Submit</button>
    </form>
  `
})
export class DynamicForm {
  private fb = inject(FormBuilder);

  dynamicForm = this.fb.nonNullable.group({
    hobbies: this.fb.array([
      this.fb.nonNullable.control('', Validators.required)
    ])
  });

  get hobbies(): FormArray {
    return this.dynamicForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.nonNullable.control('', Validators.required));
  }

  removeHobby(index: number) {
    this.hobbies.removeAt(index);
  }

  onSubmit() {
    console.log('Dynamic Form Data:', this.dynamicForm.getRawValue());
  }
}