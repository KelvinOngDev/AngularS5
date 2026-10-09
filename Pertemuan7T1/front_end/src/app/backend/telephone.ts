export interface Telephone {
  id: number;
  nama: string;
  alamat: string;
  noTelp: string;
  kodePost: string;
  dataTime: string | null;
}

export interface TelephoneRequest {
  nama: string;
  alamat: string;
  noTelp: string;
  kodePost: string;
}