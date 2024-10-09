import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoDocumentosService {

  private apiUrl = 'http://localhost:3000/departamento-documento'; // URL de tu API en NestJS

  constructor(private http: HttpClient) {}

  // Obtener la lista de departamentos
  getDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/departamentos`);
  }

  // Obtener el documento relacionado a un departamento por su ID
  getDocumentoByDepartamento(idDepartamento: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idDepartamento}`);
  }
  
}