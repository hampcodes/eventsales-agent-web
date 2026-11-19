import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../models/category.model';
import { Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private http = inject(HttpClient);

  getCategories() {
    return this.http
      .get<Page<Category>>(`${environment.apiUrl}/categories`, { params: { size: 100 } })
      .pipe(map((pagina) => pagina.content));
  }
}
