import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Telephone, TelephoneRequest } from './telephone';

@Injectable({ providedIn: 'root' })
export class TelephoneApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/Telephone';

  getAll(): Observable<Telephone[]> {
    return this.http.get<Telephone[]>(this.endpoint).pipe(timeout(10000));
  }

  create(request: TelephoneRequest): Observable<Telephone> {
    return this.http.post<Telephone>(this.endpoint, request);
  }

  update(id: number, request: TelephoneRequest): Observable<Telephone> {
    return this.http.put<Telephone>(`${this.endpoint}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}