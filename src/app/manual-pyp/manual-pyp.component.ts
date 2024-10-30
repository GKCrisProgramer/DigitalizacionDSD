import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-pyp',
  templateUrl: './manual-pyp.component.html',
  styleUrl: './manual-pyp.component.css'
})
export class ManualPYPComponent implements OnInit {
  department: any[] = [];
  profile: any[] = [];
  departmentSelected: number | null = null;

  // Combina las dos dependencias (HttpClient y Router) en un solo constructor
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.http.get<any[]>('http://localhost:3000/department').subscribe(data => {
      this.department = data;
    });
  }

  toggleProfile(idDepartment: number) {
    if (this.departmentSelected === idDepartment) {
      this.departmentSelected = null;
      this.profile = [];
    } else {
      this.departmentSelected = idDepartment;
      this.getProfiles(idDepartment);
    }
  }

  getProfiles(departmentId: number) {
    this.http.get<any[]>(`http://localhost:3000/department-profile/${departmentId}/profile`).subscribe(data => {
      this.profile = data;
    });
  }

  // Método para redirigir a la pantalla 'Desplegable-Manual'
  onProfileSelected(idProfile: number) {
    // Redirigir a la pantalla 'Desplegable-Manual' pasando el ID del puesto
    this.router.navigate(['/profile/', idProfile]);
  }

  goBack() {
    this.router.navigate(['/manual-list']);  // Ajusta la ruta según la pantalla a la que quieras volver
  }

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  
}
