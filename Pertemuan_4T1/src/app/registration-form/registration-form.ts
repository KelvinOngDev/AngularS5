import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { JsonPipe } from '@angular/common';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return password === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <div class="container my-5" style="max-width: 750px;">
      <div class="card custom-card">
        <div class="card-header custom-header text-center">
          <h3 class="mb-0 fw-bold">Form Registrasi</h3>
          <p class="text-white-50 mb-0 mt-1">Please fill out the form below to get started.</p>
        </div>
        
        <div class="card-body p-4 p-md-5">
          <form [formGroup]="regForm" (ngSubmit)="onSubmit()">
            
            <!-- Row 1: Names -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold">First Name</label>
                <input type="text" class="form-control" formControlName="firstName" 
                       [class.is-invalid]="isInvalid('firstName')" placeholder="John">
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <label class="form-label fw-semibold">Last Name <small class="text-muted fw-normal">[huruf minimal 3]</small></label>
                <input type="text" class="form-control" formControlName="lastName"
                       [class.is-invalid]="isInvalid('lastName')" placeholder="Doe">
                @if (isInvalid('lastName')) {
                  <div class="invalid-feedback">Last name must be at least 3 characters.</div>
                }
              </div>
            </div>

            <!-- Row 2: Email -->
            <div class="mb-4">
              <label class="form-label fw-semibold">Email <small class="text-muted fw-normal">[wajib valid email!]</small></label>
              <input type="email" class="form-control" formControlName="email"
                     [class.is-invalid]="isInvalid('email')" placeholder="john.doe@example.com">
              @if (isInvalid('email')) {
                <div class="invalid-feedback">Please enter a valid email address.</div>
              }
            </div>

            <!-- Row 3: Address -->
            <div class="mb-4">
              <label class="form-label fw-semibold">Address</label>
              <input type="text" class="form-control" formControlName="address"
                     [class.is-invalid]="isInvalid('address')" placeholder="123 Main Street">
            </div>

            <!-- Row 4: RT / RW -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold">RT <small class="text-muted fw-normal">[angka]</small></label>
                <input type="text" class="form-control" formControlName="rt"
                       [class.is-invalid]="isInvalid('rt')" placeholder="001">
                @if (isInvalid('rt')) { <div class="invalid-feedback">Hanya boleh berisi angka.</div> }
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <label class="form-label fw-semibold">RW <small class="text-muted fw-normal">[angka]</small></label>
                <input type="text" class="form-control" formControlName="rw"
                       [class.is-invalid]="isInvalid('rw')" placeholder="002">
                @if (isInvalid('rw')) { <div class="invalid-feedback">Hanya boleh berisi angka.</div> }
              </div>
            </div>

            <!-- Row 5: Kelurahan / Kecamatan Dropdowns -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Kecamatan</label>
                <select class="form-select" formControlName="kec" [class.is-invalid]="isInvalid('kec')">
                  <option value="" disabled>-- Drop List --</option>
                  <option value="Batam Kota">Batam Kota</option>
                  <option value="Batu Aji">Batu Aji</option>
                  <option value="Bengkong">Bengkong</option>
                </select>
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <label class="form-label fw-semibold">Kelurahan</label>
                <select class="form-select" formControlName="kel" [class.is-invalid]="isInvalid('kel')">
                  <option value="" disabled>-- Drop List --</option>
                  <option value="Belian">Belian</option>
                  <option value="Sukajadi">Sukajadi</option>
                  <option value="Sadai">Sadai</option>
                </select>
              </div>
            </div>

            <!-- Row 6: Gender (Radios) -->
            <div class="mb-4">
              <label class="form-label fw-semibold d-block">Gender</label>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" value="Laki-laki" formControlName="gender" id="genderM">
                <label class="form-check-label" for="genderM">Laki-laki</label>
              </div>
              <div class="form-check form-check-inline custom-radio">
                <input class="form-check-input" type="radio" value="Perempuan" formControlName="gender" id="genderF">
                <label class="form-check-label" for="genderF">Perempuan</label>
              </div>
            </div>

            <!-- Row 7: Passwords -->
            <div class="row mb-4">
              <div class="col-md-6">
                <label class="form-label fw-semibold">Password</label>
                <input type="password" class="form-control" formControlName="password"
                       [class.is-invalid]="isInvalid('password')" placeholder="••••••••">
              </div>
              <div class="col-md-6 mt-3 mt-md-0">
                <label class="form-label fw-semibold">Password Confirmation <small class="text-muted fw-normal">[wajib match]</small></label>
                <input type="password" class="form-control" formControlName="confirmPassword"
                       [class.is-invalid]="regForm.hasError('passwordMismatch') && regForm.get('confirmPassword')?.touched" placeholder="••••••••">
                @if (regForm.hasError('passwordMismatch') && regForm.get('confirmPassword')?.touched) {
                  <div class="invalid-feedback">Passwords do not match!</div>
                }
              </div>
            </div>

            <!-- Row 8: Reason Join (Textarea) -->
            <div class="mb-5">
              <label class="form-label fw-semibold">Reason Join</label>
              <textarea class="form-control" rows="3" formControlName="reasonJoin"
                        [class.is-invalid]="isInvalid('reasonJoin')" placeholder="Tell us why you want to join..."></textarea>
            </div>

            <!-- Buttons -->
            <div class="d-flex flex-wrap gap-3 mb-4">
              <button type="submit" class="btn btn-primary btn-lg px-5 flex-grow-1 flex-md-grow-0" [disabled]="regForm.invalid">Submit</button>
              <button type="button" class="btn btn-light btn-lg px-4 border" (click)="onReset()">Reset</button>
              <button type="button" class="btn btn-outline-info btn-lg px-4 ms-md-auto" (click)="toggleData()">
                Show Data
              </button>
            </div>

            <!-- Bottom Container: Show Data -->
            @if (showData) {
              <div class="custom-data-alert mt-4">
                <h6 class="fw-bold mb-3 text-uppercase tracking-wider text-muted">Current Form Data:</h6>
                <pre class="mb-0 bg-dark text-light p-3 rounded-3"><code>{{ regForm.value | json }}</code></pre>
              </div>
            }

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .custom-card {
      border: none;
      border-radius: 20px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
      background-color: #ffffff;
      overflow: hidden;
    }

    .custom-header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      border-bottom: none;
      padding: 2rem 1rem;
    }

    .form-control, .form-select {
      border-radius: 10px;
      border: 1.5px solid #e2e8f0;
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
      transition: all 0.2s ease-in-out;
      background-color: #f8fafc;
    }

    .form-control:focus, .form-select:focus {
      border-color: #4f46e5;
      background-color: #ffffff;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15);
    }

    .form-control::placeholder {
      color: #cbd5e1;
    }

    .custom-radio .form-check-input:checked {
      background-color: #4f46e5;
      border-color: #4f46e5;
    }

    .btn-primary {
      background-color: #4f46e5;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      transition: transform 0.1s ease, background-color 0.2s ease;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #4338ca;
      transform: translateY(-1px);
    }

    .btn-primary:disabled {
      background-color: #94a3b8;
    }

    .btn-light { border-radius: 10px; font-weight: 500; }
    .btn-outline-info { border-radius: 10px; font-weight: 500; }

    .invalid-feedback {
      animation: slideDown 0.3s ease-out forwards;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .custom-data-alert {
      background-color: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 15px;
      padding: 1.5rem;
      animation: fadeIn 0.4s ease-out;
    }

    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-5px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class RegistrationForm {
  private fb = inject(FormBuilder);
  showData = false;

  regForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    rt: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    rw: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    kec: ['', Validators.required],
    kel: ['', Validators.required],
    gender: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    reasonJoin: ['', Validators.required]
  }, { validators: passwordMatchValidator }); 

  isInvalid(controlName: string): boolean {
    const control = this.regForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.regForm.valid) {
      console.log('Form Submitted!', this.regForm.getRawValue());
      alert('Registration Successful!');
    }
  }

  onReset() {
    this.regForm.reset();
    this.showData = false;
  }

  toggleData() {
    this.showData = !this.showData;
  }
}