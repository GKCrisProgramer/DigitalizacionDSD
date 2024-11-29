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
  departments: any[] = [];
  profilesByDepartment: { [key: number]: any[] } = {};  // Almacena puestos por departamento
  expandedDepartment: number | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getDepartments();  // Cargar todas las áreas al iniciar
  }

  getDepartments() {
    this.http.get<any[]>(`${environment.apiUrl}/department`).subscribe(data => {
      this.departments = data;
    });
  }

  toggleDepartment(departmentId: number) {
    if (this.expandedDepartment === departmentId) {
      this.expandedDepartment = null;
    } else {
      this.expandedDepartment = departmentId;
      if (!this.profilesByDepartment[departmentId]) {
        this.getProfilesByDepartment(departmentId);
      }
    }
  }

  getProfilesByDepartment(profileId: number) {
    this.http.get<any[]>(`${environment.apiUrl}/department-profile/${profileId}/profile`).subscribe(data => {
      this.profilesByDepartment[profileId] = data;
    });
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
