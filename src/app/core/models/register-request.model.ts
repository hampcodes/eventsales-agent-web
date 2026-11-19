// Los dos registros comparten campos; el organizador además puede llevar website
export interface RegisterRequest {
  name: string;
  documentId: string;
  email: string;
  password: string;
  phone?: string;
}
