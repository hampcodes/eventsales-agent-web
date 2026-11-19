// Una fila del dashboard: un evento del organizador con sus entradas pagadas y su recaudación
export interface DashboardEvent {
  id: number;
  name: string;
  date: string;
  city: string;
  capacityMax: number;
  ticketsPaid: number;
  revenue: number;
}

// Resumen del organizador: solo cuentan las entradas pagadas
export interface Dashboard {
  totalEvents: number;
  upcomingEvents: number;
  ticketsPaid: number;
  revenue: number;
  // Entradas pagadas sobre el aforo total de todos sus eventos
  occupancyPercent: number;
  events: DashboardEvent[];
}
