import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);

  uploadImage(archivo: File) {
    const datos = new FormData();
    datos.append('file', archivo); // la API espera el nombre "file"
    return this.http.post<{ url: string }>(`${environment.apiUrl}/images`, datos);
  }
}
