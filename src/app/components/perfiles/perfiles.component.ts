import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'] // Asegúrate que sea style**s**Url si es array
})
export class PerfilesComponent implements OnInit{

  documentRoute!: SafeResourceUrl;  // Para el enlace seguro del PDF
  department: any[] = [];        // Lista de departamentos
  profile: any[] = [];              // Lista de puestos para el departamento seleccionado
  selectedDepartment: number | null = null; // ID del departamento seleccionado

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDepartamentos(); // Cargar los departamentos al inicializar

    // Llamada a la API para obtener el documento con ID 2
    this.http.get<any>(`${environment.apiUrl}/document/2`).subscribe(document=> {
      if (document && document.documentLinkRoute) {
        const unsafeUrl = `https://drive.google.com/file/d/${document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }, error => {
      console.error('Error al obtener el documento', error);
    });
  }

  // Obtener todos los departamentos desde el backend
  getDepartamentos() {
    this.http.get<any[]>(`${environment.apiUrl}/department`)
      .subscribe(data => {
        this.department = data;
      }, error => {
        console.error('Error al obtener los departamentos', error);
      });
  }

  // Obtener los puestos cuando se selecciona un departamento
  onDepartamentoChange(event: any) {
    const departmentId = event.target.value;
    if (departmentId) {
      this.selectedDepartment = departmentId;
      this.http.get<any[]>(`${environment.apiUrl}/department-profile/${departmentId}/profile`)
        .subscribe(data => {
          this.profile = data;
        }, error => {
          console.error('Error al obtener los puestos', error);
        });
    }
  }

  // Navegar de regreso a 'home'
  goBack() {
    this.router.navigate(['/home']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
