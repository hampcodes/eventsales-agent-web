// Detalle de una entrada: datos del evento y del pago (null si aún no tiene pago)
export interface TicketDetail {
  id: number;
  eventId: number;
  eventName: string;
  eventDate: string;
  eventCity: string;
  pricePaid: number;
  // PENDING, PAID o CANCELLED
  status: string;
  paymentMethod: string | null;
  paymentStatus: string | null;
  paymentAmount: number | null;
}
