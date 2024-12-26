import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CreateListService {
  constructor(private http: HttpClient) {}

  getAreas() {
    return this.http.get<any[]>(`${environment.apiUrl}/area`);
  }

  getDepartmentsByArea(areaId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/area-department/${areaId}/departments`);
  }

  getProfilesByArea(areaId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/area-profile/${areaId}/profiles`);
  }

  getProfilesByDepartment(departmentId: number) {
    return this.http.get<any[]>(`${environment.apiUrl}/department-profile/${departmentId}/profile`);
  }
}
