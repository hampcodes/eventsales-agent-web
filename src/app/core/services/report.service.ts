import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Dashboard } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);

  // Totales y ventas por evento del organizador que inició sesión
  getDashboard() {
    return this.http.get<Dashboard>(`${environment.apiUrl}/reports/dashboard`);
  }
}
