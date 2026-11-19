export interface TicketResponse {
  id: number;
  eventName: string;
  participantName: string;
  pricePaid: number;
  // PENDING, PAID o CANCELLED
  status: string;
}
