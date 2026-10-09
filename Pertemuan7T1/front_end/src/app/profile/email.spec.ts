import { describe, expect, it } from 'vitest';
import { FormControl, Validators } from '@angular/forms';

describe('email control', () => {
  it('required → valid', () => {
    const c = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    });
    expect(c.invalid).toBe(true);
    c.setValue('dev@site.id');
    expect(c.valid).toBe(true);
  });
});
