import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChatResponse, Conversation, HistoryMessage, VoiceResponse } from '../models/chat-response.model';

@Injectable({ providedIn: 'root' })
export class AgentService {
  private http = inject(HttpClient);

  // Sin conversationId el backend abre una conversación nueva y devuelve su id en la respuesta
  chat(message: string, conversationId: string | null) {
    return this.http.post<ChatResponse>(`${environment.apiUrl}/agent/chat`, { message, conversationId });
  }

  voice(audio: Blob, fileName: string, conversationId: string | null) {
    const form = new FormData();
    form.append('audio', audio, fileName);
    if (conversationId) form.append('conversationId', conversationId);
    return this.http.post<VoiceResponse>(`${environment.apiUrl}/agent/voice`, form);
  }

  // Panel lateral: las conversaciones del usuario, la más reciente primero
  conversations() {
    return this.http.get<Conversation[]>(`${environment.apiUrl}/agent/conversations`);
  }

  // Los mensajes guardados de una conversación
  messages(conversationId: string) {
    return this.http.get<HistoryMessage[]>(`${environment.apiUrl}/agent/conversations/${conversationId}/messages`);
  }

  deleteConversation(conversationId: string) {
    return this.http.delete<void>(`${environment.apiUrl}/agent/conversations/${conversationId}`);
  }

  // Botones Confirmar y No: el backend ejecuta la confirmación pendiente sin pasar por el modelo
  confirm(conversationId: string | null) {
    return this.http.post<ChatResponse>(`${environment.apiUrl}/agent/confirm`, {}, { params: this.params(conversationId) });
  }

  reject(conversationId: string | null) {
    return this.http.post<ChatResponse>(`${environment.apiUrl}/agent/reject`, {}, { params: this.params(conversationId) });
  }

  private params(conversationId: string | null) {
    return conversationId ? new HttpParams().set('conversationId', conversationId) : new HttpParams();
  }
}
