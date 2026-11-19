import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category.service';
import { EventService } from '../../../core/services/event.service';
import { ImageService } from '../../../core/services/image.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  selector: 'app-event-form',
  styleUrl: './event-form.css',
  templateUrl: './event-form.html',
})
export class EventForm implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private eventService = inject(EventService);
  private categoryService = inject(CategoryService);
  private imageService = inject(ImageService);

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
    categoryId: new FormControl<number | null>(null),
    date: new FormControl<Date | null>(null, Validators.required),
    city: new FormControl('', [Validators.required, Validators.pattern(/\S/)]),
    capacityMax: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]),
    basePrice: new FormControl('', [Validators.required, Validators.min(0.01)]),
    imageUrl: new FormControl('', Validators.required),
  });

  categorias = signal<Category[]>([]);
  subiendo = signal(false);
  guardando = signal(false);
  error = signal('');

  // Con id en la ruta (/organizador/event-form/:id) la pantalla edita; sin id, crea
  eventoId = this.route.snapshot.paramMap.get('id');

  ngOnInit() {
    this.categoryService.getCategories().subscribe((lista) => this.categorias.set(lista));

    if (this.eventoId) {
      this.eventService.getEvent(Number(this.eventoId)).subscribe({
        next: (evento) =>
          this.form.patchValue({
            name: evento.name,
            categoryId: evento.categoryId,
            // La fecha llega como yyyy-MM-dd; con la hora fija no se corre un día por la zona horaria
            date: new Date(`${evento.date}T00:00:00`),
            city: evento.city,
            capacityMax: String(evento.capacityMax),
            basePrice: String(evento.basePrice),
            imageUrl: evento.imageUrl,
          }),
        error: (err) => this.error.set(err.error?.message ?? 'No se pudo cargar el evento'),
      });
    }
  }

  elegirImagen(event: Event) {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;

    this.subiendo.set(true);
    this.error.set('');
    this.form.controls.imageUrl.setValue('');

    this.imageService.uploadImage(archivo).subscribe({
      next: (respuesta) => {
        this.form.controls.imageUrl.setValue(respuesta.url);
        this.subiendo.set(false);
      },
      error: (err) => {
        this.subiendo.set(false);
        this.error.set(err.error?.message ?? 'No se pudo subir la imagen');
      },
    });
  }

  guardar() {
    const datos = this.form.value;
    this.guardando.set(true);
    this.error.set('');

    const evento = {
      name: (datos.name ?? '').trim(),
      date: formatDate(datos.date!, 'yyyy-MM-dd', 'en-US'),
      city: (datos.city ?? '').trim(),
      capacityMax: Number(datos.capacityMax),
      basePrice: Number(datos.basePrice),
      imageUrl: datos.imageUrl ?? '',
      categoryId: datos.categoryId ?? null,
    };

    const peticion = this.eventoId
      ? this.eventService.updateEvent(Number(this.eventoId), evento)
      : this.eventService.createEvent(evento);

    peticion.subscribe({
      next: (guardado) => {
        const accion = this.eventoId ? 'actualizado' : 'creado';
        // El mensaje sigue visible aunque se cambie de pantalla
        this.snackBar.open(`Evento «${guardado.name}» ${accion} correctamente`, 'Cerrar', { duration: 4000 });
        this.router.navigateByUrl('/organizador/my-events');
      },
      error: (err) => {
        this.guardando.set(false);
        this.error.set(err.error?.message ?? 'No se pudo guardar el evento');
      },
    });
  }
}
