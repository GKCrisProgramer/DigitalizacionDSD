import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateListService } from '../../services/CreateList.service';


@Component({
  selector: 'app-mproc-list',
  templateUrl: './mproc-list.component.html',
  styleUrl: './mproc-list.component.css'
})
export class ManualProcListComponent implements OnInit{
  areas: any[] = [];
  departmentsByArea: { [key: number]: any[] } = {};
  profilesByArea: { [key: number]: any[] } = {};
  profilesByDepartment: { [key: number]: any[] } = {};
  expandedArea: number | null = null;

  constructor(private createListService: CreateListService, private router: Router) {}

  ngOnInit() {
    this.getAreas(); 
  }

  getAreas() {
    this.createListService.getAreas().subscribe(data => {
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
    this.createListService.getDepartmentsByArea(areaId).subscribe(data =>{
      this.departmentsByArea[areaId] = data;
    })
  }

  getProfilesByArea(areaId: number) {
    this.createListService.getProfilesByArea(areaId).subscribe(data => {
      this.profilesByArea[areaId] = data;
    });
  }

  getProfilesByDepartment(departmentId: number) {
    this.createListService.getProfilesByDepartment(departmentId).subscribe(data => {
      this.profilesByDepartment[departmentId] = data;  
    });
  }

  toggleDepartment(departmentId: number) {
    if (this.profilesByDepartment[departmentId]) {
      delete this.profilesByDepartment[departmentId];
    } else {
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
