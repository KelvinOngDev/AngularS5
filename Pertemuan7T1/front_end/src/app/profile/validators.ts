import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserApi } from './user-api';

// Custom validator: fungsi murni (pure function) yang mengembalikan ValidatorFn.
// Tidak menyimpan state, tidak side-effect -> mudah ditest dan digunakan ulang.
export function forbiddenName(re: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const blocked = re.test(control.value);
    return blocked
      ? { forbiddenName: { value: control.value } }
      : null;
  };
}

// Async validator: menunggu (debounce) dulu sebelum call API, agar tidak
// nge-hit server di setiap ketikan. Baru jalan kalau sync validators lolos.
export function usernameTaken(api: UserApi): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return timer(300).pipe(
      switchMap(() => api.exists(control.value)),
      map(exists => exists ? { usernameTaken: true } : null),
      catchError(() => of(null))
    );
  };
}
