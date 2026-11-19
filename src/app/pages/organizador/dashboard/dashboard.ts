import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Dashboard } from '../../../core/models/dashboard.model';
import { ReportService } from '../../../core/services/report.service';

@Component({
  imports: [DatePipe, DecimalPipe, RouterLink, BaseChartDirective, MatButtonModule, MatCardModule, MatProgressBarModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardPage implements OnInit {
  private reportService = inject(ReportService);

  datos = signal<Dashboard | null>(null);
  // Gráfico ya armado: se construye una sola vez al recibir los datos
  grafico = signal<ChartConfiguration<'bar'> | null>(null);
  error = signal('');

  ngOnInit() {
    this.reportService.getDashboard().subscribe({
      next: (d) => {
        this.error.set('');
        this.datos.set(d);
        this.grafico.set({
          type: 'bar',
          data: {
            labels: d.events.map((e) => e.name),
            datasets: [{ data: d.events.map((e) => e.revenue), label: 'Ingresos (S/)', backgroundColor: '#3b82f6' }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
          },
        });
      },
      error: (err) => this.error.set(err.error?.message ?? 'No se pudo cargar el dashboard'),
    });
  }

  // Porcentaje de aforo vendido de un evento, para la barra de ocupación
  ocupacion(ventas: number, aforo: number) {
    return aforo === 0 ? 0 : Math.round((ventas * 100) / aforo);
  }
}
