import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Category } from '../../../core/models/category.model';
import { EventResponse } from '../../../core/models/event-response.model';
import { CategoryService } from '../../../core/services/category.service';
import { EventService } from '../../../core/services/event.service';

@Component({
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  selector: 'app-events',
  styleUrl: './events.css',
  templateUrl: './events.html',
})
export class Events implements OnInit {
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);

  filtrosForm = new FormGroup({
    name: new FormControl('', Validators.maxLength(100)),
    categoryId: new FormControl<number | null>(null),
    // Lo que el usuario elige en el paginador también va en el formulario
    pagina: new FormControl(0),
    tamano: new FormControl(9),
  });

  categorias = signal<Category[]>([]);
  eventos = signal<EventResponse[]>([]);
  error = signal('');

  // La API devuelve la página pedida y el total de eventos
  total = signal(0);

  ngOnInit() {
    this.categoryService.getCategories().subscribe((lista) => this.categorias.set(lista));
    this.cargarEventos();
    // Si cambia el buscador o la categoría, se vuelve a la primera página (sin pedir la lista dos veces)
    this.filtrosForm.controls.name.valueChanges.subscribe(() => this.filtrosForm.controls.pagina.setValue(0, { emitEvent: false }));
    this.filtrosForm.controls.categoryId.valueChanges.subscribe(() => this.filtrosForm.controls.pagina.setValue(0, { emitEvent: false }));
    // Cualquier cambio del formulario (buscador, categoría o paginador) vuelve a pedir la lista
    this.filtrosForm.valueChanges.subscribe(() => this.cargarEventos());
  }

  cambiarPagina(evento: PageEvent) {
    this.filtrosForm.patchValue({ pagina: evento.pageIndex, tamano: evento.pageSize });
  }

  cargarEventos() {
    if (this.filtrosForm.invalid) return;
    const filtros = this.filtrosForm.value;
    // Sin organizador: el participante ve los eventos de todos
    this.eventService
      .getEvents(
        null,
        filtros.name ?? '',
        filtros.categoryId ?? null,
        filtros.pagina ?? 0,
        filtros.tamano ?? 9,
        // "Próximos eventos": sin los que ya pasaron
        new Date().toLocaleDateString('en-CA'),
      )
      .subscribe({
        next: (respuesta) => {
          this.error.set('');
          this.eventos.set(respuesta.content);
          this.total.set(respuesta.totalElements);
        },
        error: (err) => this.error.set(err.error?.message ?? 'No se pudieron cargar los eventos'),
      });
  }
}
