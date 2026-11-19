import { MatPaginatorIntl } from '@angular/material/paginator';

// Textos del paginador en español: se registra en organizador.routes.ts
export function paginatorEs() {
  const intl = new MatPaginatorIntl();
  intl.itemsPerPageLabel = 'Eventos por página:';
  intl.firstPageLabel = 'Primera página';
  intl.previousPageLabel = 'Página anterior';
  intl.nextPageLabel = 'Página siguiente';
  intl.lastPageLabel = 'Última página';
  intl.getRangeLabel = (page, pageSize, length) => {
    if (length === 0) return '0 de 0';
    const inicio = page * pageSize + 1;
    const fin = Math.min((page + 1) * pageSize, length);
    return `${inicio} – ${fin} de ${length}`;
  };
  return intl;
}
