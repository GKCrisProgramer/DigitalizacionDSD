import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }

  // Lista de departamentos y sus respectivos organigramas
  departamentos = [
    { nombre: 'GENERAL', imagen: '' },
    { nombre: 'SAC', imagen: '/Organigrama-SAC.png' },
    { nombre: 'Departamento2', imagen: '' },
    { nombre: 'Departamento3', imagen: '' },
    { nombre: 'Departamento4', imagen: '' },
    // Añade más departamentos aquí
  ];

  organigramaSeleccionado: string = this.departamentos[0].imagen; // Organigrama inicial

  // Cambiar organigrama al seleccionar un departamento
  cambiarOrganigrama(departamento: any) {
    this.organigramaSeleccionado = departamento.imagen;
  }
}
