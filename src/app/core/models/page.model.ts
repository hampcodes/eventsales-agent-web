// La API entrega las listas paginadas: los datos van en "content" y el resto describe la página
export interface Page<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
