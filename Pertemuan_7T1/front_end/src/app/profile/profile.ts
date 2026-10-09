import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { forbiddenName, usernameTaken } from './validators';
import { UserApi } from './user-api';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html'
})
export class Profile {
  form = new FormGroup({
    name: new FormControl('', { nonNullable: true })
  });

  email = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email]
  });

  setEmail() {
    this.email.setValue('dev@example.com');
    console.log(this.email.value);   // string
    console.log(this.email.valid);   // boolean
  }

  resetEmail() {
    this.email.reset();              // kembali ke ''
  }

  profileForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
    email: new FormControl('', { nonNullable: true }),
    address: new FormGroup({
      city: new FormControl('', { nonNullable: true }),
      zip: new FormControl('', { nonNullable: true })
    })
  });

  submitProfile() {
    console.log(this.profileForm.value);
    // { name, email, address: { city, zip } }
  }

  // Contoh form kedua: field wajib diisi (validators) + tombol disabled saat invalid
  editForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    address: new FormGroup({
      city: new FormControl('', { nonNullable: true, validators: [Validators.required] })
    })
  });

  save() {
    if (this.editForm.invalid) return;
    console.log(this.editForm.value);
    // { name, address: { city } }
  }

  // Contoh form ketiga: FormBuilder (ringkas, kontrol tetap utuh)
  private fb = inject(FormBuilder);

  builderForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    city: ['']
  });

  saveBuilder() {
    if (this.builderForm.invalid) return;
    console.log(this.builderForm.value);
    // { name, email, city }
  }

  // Mutasi nilai: setValue (wajib semua field, strict) vs patchValue (sebagian) vs getRawValue (termasuk disabled)
  fillAll() {
    this.builderForm.setValue({ name: 'A', email: 'a@b.co', city: 'ID' });
    // setValue: shape HARUS persis sama dengan semua control, kalau ada yg kurang -> error
  }

  fillCityOnly() {
    this.builderForm.patchValue({ city: 'SG' });
    // patchValue: boleh sebagian field saja, field lain tidak berubah
  }

  getPayload() {
    const payload = this.builderForm.getRawValue();
    // getRawValue: ikut menyertakan value control yang disabled (value tidak ikut jika pakai .value)
    console.log(payload);
    return payload;
  }

  // Getter untuk akses control email dgn aman di template (untuk cek touched/dirty/hasError)
  get builderEmail() {
    return this.builderForm.controls.email;
  }

  // Custom validator: forbiddenName (fungsi murni, reusable, mudah ditest)
  username = new FormControl('', {
    nonNullable: true,
    validators: [forbiddenName(/admin/i)]
  });

  // Aturan lintas-field: validator dipasang di level FormGroup, bukan per-control,
  // karena butuh membandingkan nilai dari 2 control sekaligus (password vs confirm).
  private passwordsMatch: ValidatorFn = (group) => {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password === confirm
      ? null
      : { passwordMismatch: true };
  };

  passwordForm = this.fb.nonNullable.group({
    password: ['', Validators.required],
    confirm: ['', Validators.required]
  }, { validators: this.passwordsMatch });

  // Async validator: sync validator (required) HARUS lolos dulu, baru async jalan.
  // updateOn: 'blur' opsional; di sini pakai default 'change' + debounce di dalam validatornya.
  private api = inject(UserApi);

  newUsername = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
    asyncValidators: [usernameTaken(this.api)]
  });

  // FormArray: daftar dinamis (jumlah field tidak tetap, bisa tambah/hapus runtime)
  skills = this.fb.array([
    this.fb.nonNullable.control('Angular')
  ]);

  // FormArray tidak bisa jadi root [formGroup] langsung, jadi dibungkus FormGroup
  skillsForm = this.fb.group({
    skills: this.skills
  });

  addSkill() {
    this.skills.push(this.fb.nonNullable.control(''));
  }

  removeSkill(i: number) {
    this.skills.removeAt(i);
  }
}
