import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Mahasiswa, MahasiswaRequest } from './mahasiswa';

@Injectable({ providedIn: 'root' })
export class BackendApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/Pertemuan7'; 

  getAll(): Observable<Mahasiswa[]> {
    return this.http.get<Mahasiswa[]>(this.endpoint).pipe(timeout(10000));
  }

  create(request: MahasiswaRequest): Observable<unknown> {
    return this.http.post<unknown>(this.endpoint, request);
  }

  update(id: number, request: MahasiswaRequest): Observable<unknown> {
    return this.http.put<unknown>(`${this.endpoint}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}