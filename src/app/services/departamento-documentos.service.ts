import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentDocumentService {
  private apiUrl = `${environment.apiUrl}/department-document`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/department`);
  }

  getDocumentbyDepartmentInOrgChart(idDepartment: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idDepartment}`);
  }

  getDocumentByDepartmentInDetail(deparmentId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/department/${deparmentId}`);
  }

}
