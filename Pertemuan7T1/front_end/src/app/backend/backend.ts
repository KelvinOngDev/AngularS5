import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BackendApi } from './backend-api';
import { Mahasiswa, MahasiswaRequest } from './mahasiswa';

@Component({
  selector: 'app-backend',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './backend.html',
  styleUrl: './backend.css'
})
export class Backend implements OnInit {
  private readonly api = inject(BackendApi);
  private readonly changeDetector = inject(ChangeDetectorRef);

  mahasiswa: Mahasiswa[] = [];
  form: MahasiswaRequest = this.emptyForm();
  editingId: number | null = null;
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.errorMessage = '';
    this.api.getAll().subscribe({
      next: (data) => {
        this.mahasiswa = data;
        this.loading = false;
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Data gagal dimuat. Pastikan API dan MySQL sedang berjalan.';
        this.changeDetector.detectChanges();
      }
    });
  }

  save(): void {
    if (!this.form.nama.trim() || !this.form.alamat.trim()) {
      this.errorMessage = 'Nama dan alamat wajib diisi.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request = {
      nama: this.form.nama.trim(),
      alamat: this.form.alamat.trim(),
      pesanpesan: this.form.pesanpesan.trim(),
      ...(this.form.dateTime ? { dateTime: this.form.dateTime } : {})
    };

    const operation = this.editingId === null
      ? this.api.create(request)
      : this.api.update(this.editingId, request);

    operation.subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = this.editingId === null
          ? 'Data berhasil ditambahkan.'
          : 'Data berhasil diperbarui.';
        this.resetForm();
        this.loadData();
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'Data gagal disimpan. Periksa koneksi ke backend.';
        this.changeDetector.detectChanges();
      }
    });
  }

  edit(item: Mahasiswa): void {
    this.editingId = item.id;
    this.form = {
      nama: item.nama,
      alamat: item.alamat,
      pesanpesan: item.pesanpesan,
      dateTime: item.dateTime ? item.dateTime.slice(0, 16) : ''
    };
    this.successMessage = '';
    this.errorMessage = '';
  }

  remove(item: Mahasiswa): void {
    if (!window.confirm(`Hapus data ${item.nama}?`)) {
      return;
    }

    this.errorMessage = '';
    this.api.delete(item.id).subscribe({
      next: () => {
        this.successMessage = 'Data berhasil dihapus.';
        if (this.editingId === item.id) {
          this.resetForm();
        }
        this.loadData();
        this.changeDetector.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Data gagal dihapus. Periksa koneksi ke backend.';
        this.changeDetector.detectChanges();
      }
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form = this.emptyForm();
  }

  private emptyForm(): MahasiswaRequest {
    return { nama: '', alamat: '', pesanpesan: '' };
  }
}
