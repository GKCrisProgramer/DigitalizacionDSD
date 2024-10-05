import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-pyp',
  templateUrl: './manual-pyp.component.html',
  styleUrl: './manual-pyp.component.css'
})
export class ManualPYPComponent implements OnInit {
  departamentos: any[] = [];
  puestos: any[] = [];
  departamentoSeleccionado: number | null = null;

  // Combina las dos dependencias (HttpClient y Router) en un solo constructor
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.obtenerDepartamentos();
  }

  obtenerDepartamentos() {
    this.http.get<any[]>('http://localhost:3000/departamento').subscribe(data => {
      this.departamentos = data;
    });
  }

  togglePuestos(idDepartamento: number) {
    if (this.departamentoSeleccionado === idDepartamento) {
      this.departamentoSeleccionado = null;
      this.puestos = [];
    } else {
      this.departamentoSeleccionado = idDepartamento;
      this.obtenerPuestos(idDepartamento);
    }
  }

  obtenerPuestos(idDepartamento: number) {
    this.http.get<any[]>(`http://localhost:3000/departamento-puesto/${idDepartamento}/puestos`).subscribe(data => {
      this.puestos = data;
    });
  }

  // Método para redirigir a la pantalla 'Desplegable-Manual'
  onPuestoSeleccionado(idPuesto: number) {
    // Redirigir a la pantalla 'Desplegable-Manual' pasando el ID del puesto
    this.router.navigate(['/profile/', idPuesto]);
  }

  goBack() {
    this.router.navigate(['/manual-list']);  // Ajusta la ruta según la pantalla a la que quieras volver
  }

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  
}
