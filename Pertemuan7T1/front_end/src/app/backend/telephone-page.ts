import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TelephoneApi } from './telephone-api';
import { Telephone, TelephoneRequest } from './telephone';

@Component({
  selector: 'app-telephone-page',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './telephone-page.html',
  styleUrl: './telephone-page.css'
})
export class TelephonePage implements OnInit {
  private readonly api = inject(TelephoneApi);
  private readonly changeDetector = inject(ChangeDetectorRef);

  telephones: Telephone[] = [];
  form: TelephoneRequest = this.emptyForm();
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
        this.telephones = data;
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
    if (!this.form.nama.trim() || !this.form.alamat.trim()
      || !this.form.noTelp.trim() || !this.form.kodePost.trim()) {
      this.errorMessage = 'Semua kolom wajib diisi.';
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';
    const request = {
      nama: this.form.nama.trim(),
      alamat: this.form.alamat.trim(),
      noTelp: this.form.noTelp.trim(),
      kodePost: this.form.kodePost.trim()
    };
    const operation = this.editingId === null
      ? this.api.create(request)
      : this.api.update(this.editingId, request);

    operation.subscribe({
      next: () => {
        this.saving = false;
        this.successMessage = this.editingId === null
          ? 'Data telephone berhasil ditambahkan.'
          : 'Data telephone berhasil diperbarui.';
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

  edit(item: Telephone): void {
    this.editingId = item.id;
    this.form = {
      nama: item.nama,
      alamat: item.alamat,
      noTelp: item.noTelp,
      kodePost: item.kodePost
    };
    this.successMessage = '';
    this.errorMessage = '';
  }

  remove(item: Telephone): void {
    if (!window.confirm(`Hapus data ${item.nama || item.id}?`)) {
      return;
    }

    this.errorMessage = '';
    this.api.delete(item.id).subscribe({
      next: () => {
        this.successMessage = 'Data telephone berhasil dihapus.';
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

  private emptyForm(): TelephoneRequest {
    return { nama: '', alamat: '', noTelp: '', kodePost: '' };
  }
}