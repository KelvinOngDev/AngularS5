import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Mock API sederhana untuk simulasi pengecekan username ke server.
@Injectable({ providedIn: 'root' })
export class UserApi {
  private takenUsernames = ['admin', 'root', 'test'];

  exists(username: string): Observable<boolean> {
    return of(this.takenUsernames.includes(username.toLowerCase())).pipe(delay(500));
  }
}
