import { ChartConfiguration } from 'chart.js';
import { ChatResponse } from './chat-response.model';

// Un mensaje de la conversación: lo que escribió el usuario o la respuesta del agente
export interface Mensaje {
  autor: 'usuario' | 'agente';
  texto: string;
  respuesta?: ChatResponse;
  // Gráfico ya armado para ng2-charts (se construye una sola vez al recibir la respuesta)
  grafico?: ChartConfiguration<'bar' | 'pie'>;
}
