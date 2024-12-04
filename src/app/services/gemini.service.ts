import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl: string = 'https://api.openai.com/v1/chat/completions'; // Remplacez avec l'URL de l'API Gemini si différente.
  private apiKey: string = 'AIzaSyDqz0ljo7lEKZamkcYxOLT1Uwfw9cABUSE'; // Remplacez par votre clé d'API Gemini.

  constructor(private http: HttpClient) {}

  getResponse(userInput: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    const body = {
      model: 'gpt-4', // Remplacez par le modèle Gemini si nécessaire.
      messages: [{ role: 'user', content: userInput }],
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
