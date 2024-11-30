import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class InductionCoursesService {
    private apiUrl = `${environment.apiUrl}/document`;
    constructor(private http: HttpClient) {}
  
    getDocument(documentId: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/${documentId}`);
    }
  }
  