import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentDocumentService {

  private apiUrl = 'http://localhost:3000/department-document'; // URL de tu API en NestJS

  constructor(private http: HttpClient) {}

  // Obtener la lista de departamentos
  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/department`);
  }

  // Obtener el documento relacionado a un departamento por su ID
  getDocumentsbyDepartment(idDepartment: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idDepartment}`);
  }
  
}