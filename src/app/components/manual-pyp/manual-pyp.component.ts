import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManualPypDataService } from '../../services/manual-pyp.service';

@Component({
  selector: 'app-manual-pyp',
  templateUrl: './manual-pyp.component.html',
  styleUrls: ['./manual-pyp.component.css']
})
export class ManualPYPComponent implements OnInit {
  areas: any[] = [];
  departmentsByArea: { [key: number]: any[] } = {}; // Almacena departamentos por área
  profilesByArea: { [key: number]: any[] } = {};    // Almacena perfiles por área
  positionsByDepartment: { [key: number]: any[] } = {};  // Almacena puestos por departamento
  expandedArea: number | null = null;              // Área seleccionada

  constructor(private dataService: ManualPypDataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getAreas().subscribe(data => {
      this.areas = data;
    });
  }

  getAreas() {
    this.dataService.getAreas().subscribe(data => {
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
    this.dataService.getDepartmentsByArea(areaId).subscribe(data => {
      this.departmentsByArea[areaId] = data;
    });
  }

  getProfilesByArea(areaId: number) {
    this.dataService.getProfilesByArea(areaId).subscribe(data => {
      this.profilesByArea[areaId] = data;
    });
  }

  // Agregar una propiedad para almacenar perfiles por departamento
  profilesByDepartment: { [key: number]: any[] } = {};  // Almacena perfiles por departamento

  // Nueva función para obtener perfiles por departamento
  getProfilesByDepartment(departmentId: number) {
    this.dataService.getProfilesByDepartment(departmentId).subscribe(data => {
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

  onProfileSelected(profileId: number) {
    this.router.navigate(['/profile/', profileId]);
  }

  onDepartmentSelected(departmentId: number) {
    this.router.navigate(['/department/', departmentId]);
  }

  goBack() {
    this.router.navigate(['/manual-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
