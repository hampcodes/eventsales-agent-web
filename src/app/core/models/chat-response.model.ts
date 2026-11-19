export interface EventSummary {
  id: number;
  name: string;
  date: string;
  city: string;
  basePrice: number;
  availableCapacity: number;
}

// status: PENDING, CANCELLED, CONFIRMATION_REQUIRED, CANCEL_CONFIRMATION_REQUIRED,
// AMBIGUOUS, NOT_FOUND, MISSING_EVENT, NO_PENDING_TICKET o NO_PENDING_CONFIRMATION
export interface PurchaseResult {
  ticketId: number | null;
  eventId: number | null;
  eventName: string | null;
  price: number | null;
  status: string;
}

// Gráfico que prepara el backend para el organizador: el frontend solo lo dibuja
export interface ChartData {
  type: 'bar' | 'pie';
  title: string;
  labels: string[];
  values: number[];
}

export interface FileInfo {
  name: string;
  content: string;
}

export interface VoiceResponse {
  transcript: string;
  response: ChatResponse;
  audio: string | null;
}

export interface ChatResponse {
  // La conversación a la que pertenece la respuesta (el backend abre una nueva si no se indicó)
  conversationId?: string;
  message: string;
  events: EventSummary[] | null;
  purchase: PurchaseResult | null;
  chart: ChartData | null;
  file: FileInfo | null;
}

// Un mensaje de la conversación guardada: autor es 'usuario' o 'agente'
export interface HistoryMessage {
  autor: 'usuario' | 'agente';
  texto: string;
}

// Una conversación del panel lateral
export interface Conversation {
  id: string;
  title: string;
}
