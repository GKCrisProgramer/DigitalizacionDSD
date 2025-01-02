import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentProfileService {
  private apiUrl = `${environment.apiUrl}/document-profile`;
  private category = 1;
  constructor(private http: HttpClient) {}

  getDocumentByProfile(profileId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${profileId}/category/${this.category}`);
  }
}
