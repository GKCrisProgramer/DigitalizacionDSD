import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentoPuestoService {
  private apiUrl = 'http://localhost:3000/documento-puesto';  // URL de tu API

  constructor(private http: HttpClient) {}

  // Método para obtener el documento relacionado con un puesto
  getDocumentoByPuesto(idPuesto: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/puesto/${idPuesto}`);
  }
}
