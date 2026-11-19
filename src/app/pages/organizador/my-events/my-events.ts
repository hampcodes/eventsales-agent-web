import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { Category } from '../../../core/models/category.model';
import { EventResponse } from '../../../core/models/event-response.model';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryService } from '../../../core/services/category.service';
import { EventService } from '../../../core/services/event.service';

@Component({
  imports: [
    DatePipe,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatTableModule,
  ],
  selector: 'app-my-events',
  styleUrl: './my-events.css',
  templateUrl: './my-events.html',
})
export class MyEvents implements OnInit {
  private auth = inject(AuthService);
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);

  filtrosForm = new FormGroup({
    name: new FormControl('', Validators.maxLength(100)),
    categoryId: new FormControl<number | null>(null),
    // Lo que el usuario elige en el paginador también va en el formulario
    pagina: new FormControl(0),
    tamano: new FormControl(10),
  });

  categorias = signal<Category[]>([]);

  columnas = ['evento', 'categoria', 'fecha', 'ciudad', 'precio', 'vendidas', 'acciones'];

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
    this.eventService
      .getEvents(
        this.auth.session()?.profileId ?? null,
        filtros.name ?? '',
        filtros.categoryId ?? null,
        filtros.pagina ?? 0,
        filtros.tamano ?? 10,
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
