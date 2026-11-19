import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HomeResponse } from '../models/home-response.model';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private http = inject(HttpClient);

  getHome() {
    return this.http.get<HomeResponse>(`${environment.apiUrl}/home`);
  }
}
