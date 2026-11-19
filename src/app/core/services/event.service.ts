import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EventRequest } from '../models/event-request.model';
import { EventResponse } from '../models/event-response.model';
import { Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);

  // page empieza en 0. Se ordena por id descendente: lo recién creado sale primero
  // desde (AAAA-MM-DD) es opcional: oculta los eventos anteriores a esa fecha
  getEvents(
    organizerId: number | null,
    name: string,
    categoryId: number | null,
    page = 0,
    size = 10,
    desde = '',
  ) {
    let params = new HttpParams().set('page', page).set('size', size).set('sort', 'id,desc');
    if (desde) params = params.set('startDate', desde);
    if (organizerId) params = params.set('organizerId', organizerId);
    if (name) params = params.set('name', name);
    if (categoryId) params = params.set('categoryId', categoryId);
    return this.http.get<Page<EventResponse>>(`${environment.apiUrl}/events`, { params });
  }

  // Público: la API no pide sesión para ver un evento
  getEvent(id: number) {
    return this.http.get<EventResponse>(`${environment.apiUrl}/events/${id}`);
  }

  // Solo el organizador dueño del evento (la API responde 403 si no)
  updateEvent(id: number, evento: EventRequest) {
    return this.http.put<EventResponse>(`${environment.apiUrl}/events/${id}`, evento);
  }

  createEvent(evento: EventRequest) {
    return this.http.post<EventResponse>(`${environment.apiUrl}/events`, evento);
  }
}
