import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  searchProfilesCoursesAndDepartmentsWithDocuments(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/seeker?q=${query}`
    );
  }
}
