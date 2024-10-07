import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrl: './perfiles.component.css'
})
export class PerfilesComponent implements OnInit{

  departamentos: any[] = []; // Lista de departamentos
  puestos: any[] = [];       // Lista de puestos para el departamento seleccionado
  selectedDepartamento: number | null = null; // ID del departamento seleccionado
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getDepartamentos(); // Carga los departamentos al inicializar
  }

  // Obtener todos los departamentos desde el backend
  getDepartamentos() {
    this.http.get<any[]>('http://localhost:3000/departamento')
      .subscribe(data => {
        this.departamentos = data;
      }, error => {
        console.error('Error al obtener los departamentos', error);
      });
  }

  // Obtener los puestos cuando se selecciona un departamento
  onDepartamentoChange(event: any) {
    const departamentoId = event.target.value;
    if (departamentoId) {
      this.selectedDepartamento = departamentoId;
      this.http.get<any[]>(`http://localhost:3000/departamento-puesto/${departamentoId}/puestos`)
        .subscribe(data => {
          this.puestos = data;
        }, error => {
          console.error('Error al obtener los puestos', error);
        });
    }
  }

  goBack() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
}
