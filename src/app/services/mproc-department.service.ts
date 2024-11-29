import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentProcedureDeparmentService {
  private apiUrl = `${environment.apiUrl}/department-document`;
  private category = 3;
  constructor(private http: HttpClient) {}

  getDocumentByDepartment(departmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/department/${departmentId}/category/${this.category}`);
  }
}
