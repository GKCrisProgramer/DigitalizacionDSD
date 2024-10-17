import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentProfileService {
  private apiUrl = 'http://localhost:3000/document-profile';  // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener el documento relacionado con un puesto
  getDocumentByProfile(idProfile: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${idProfile}`);
  }
}
