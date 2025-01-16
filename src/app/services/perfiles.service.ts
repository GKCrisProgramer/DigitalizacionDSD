import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerfilesService{
    constructor(private http: HttpClient) {}

    getDocument(): Observable<any>{
        return this.http.get<any>(`${environment.apiUrl}/document/2`)
    }

    getDepartments(): Observable<any>{
        return this.http.get<any[]>(`${environment.apiUrl}/department`)
    }

    onDepartmentChanges(departmentId: number): Observable<any>{
        return this.http.get<any[]>(`${environment.apiUrl}/department-profile/${departmentId}/profile`)
    }
}