import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-mproc-list',
  templateUrl: './mproc-list.component.html',
  styleUrl: './mproc-list.component.css'
})
export class MprocListComponent implements OnInit{
  areas: any[] = [];
  departmentsByArea: { [key: number]: any[] } = {};
  profilesByArea: { [key: number]: any[] } = {};  // Almacena puestos por departamento
  profilesByDepartment: { [key: number]: any[] } = {};  // Almacena perfiles por departamento
  expandedArea: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getAreas();  // Cargar todas las áreas al iniciar
  }

  getAreas() {
    this.http.get<any[]>(`${environment.apiUrl}/area`).subscribe(data => {
      this.areas = data;
    });
  }

  toggleArea(areaId: number) {
    if (this.expandedArea === areaId) {
      this.expandedArea = null;
    } else {
      this.expandedArea = areaId;
      if (!this.departmentsByArea[areaId]) {
        this.getDepartmentsByArea(areaId);
        this.getProfilesByArea(areaId);
      }
    }
  }

  getDepartmentsByArea(areaId: number) {
    this.http.get<any[]>(`${environment.apiUrl}/area-department/${areaId}/departments`).subscribe(data =>{
      this.departmentsByArea[areaId] = data;
    })
  }

  getProfilesByArea(areaId: number) {
    this.http.get<any[]>(`${environment.apiUrl}/area-profile/${areaId}/profiles`).subscribe(data => {
      this.profilesByArea[areaId] = data;
    });
  }

  // Nueva función para obtener perfiles por departamento
  getProfilesByDepartment(departmentId: number) {
    this.http.get<any[]>(`${environment.apiUrl}/department-profile/${departmentId}/profile`).subscribe(data => {
      this.profilesByDepartment[departmentId] = data;  // Almacena los perfiles del departamento
    });
  }

  // Modifica toggleArea para expandir departamentos y cargar perfiles
  toggleDepartment(departmentId: number) {
    if (this.profilesByDepartment[departmentId]) {
      // Si ya se han cargado los perfiles, los oculta
      delete this.profilesByDepartment[departmentId];
    } else {
      // Carga los perfiles si no han sido cargados
      this.getProfilesByDepartment(departmentId);
    }
  }


  onProfileSelected(profileId: number){
    this.router.navigate(['/ProcedimientosProfile/', profileId]);
  }

  onDepartmentSelected(departmentId: number) {
    this.router.navigate(['/ProcedimientosDepartment/', departmentId]);
  }

  goBack() {
    this.router.navigate(['/manual-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
