import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class InductionListService {
    constructor(private http: HttpClient) {}

    getDocumentsByCourse(documentId: number): Observable<any[]>{
        return this.http.get<any[]>(
            `${environment.apiUrl}/course-document/${documentId}/document`
        )
    }

    getCourse(): Observable<any[]>{
        return this.http.get<any[]>(
            `${environment.apiUrl}/course`
        )
    }
}
