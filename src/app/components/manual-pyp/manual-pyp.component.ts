import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateListService } from '../../services/CreateList.service';

@Component({
  selector: 'app-manual-pyp',
  templateUrl: './manual-pyp.component.html',
  styleUrls: ['./manual-pyp.component.css']
})
export class ManualPYPComponent implements OnInit {
  areas: any[] = [];
  departmentsByArea: { [key: number]: any[] } = {};
  profilesByArea: { [key: number]: any[] } = {};
  positionsByDepartment: { [key: number]: any[] } = {};
  expandedArea: number | null = null;

  constructor(private createListService: CreateListService, private router: Router) {}

  ngOnInit() {
    this.createListService.getAreas().subscribe(data => {
      this.areas = data;
    });
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
    this.createListService.getDepartmentsByArea(areaId).subscribe(data => {
      this.departmentsByArea[areaId] = data;
    });
  }

  getProfilesByArea(areaId: number) {
    this.createListService.getProfilesByArea(areaId).subscribe(data => {
      this.profilesByArea[areaId] = data;
    });
  }

  profilesByDepartment: { [key: number]: any[] } = {};  

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

  onProfileSelected(profileId: number) {
    const screenAvailWidth = window.screen.availWidth;
    const screenAvailHeight = window.screen.availHeight;
    console.log(screenAvailWidth, screenAvailHeight);
    const url = `${window.location.origin}/profilePYP/${profileId}`;
    const options = `toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screenAvailWidth},height=${screenAvailHeight}`;
    window.open(url, '_blank' , options	);
  }
  
  onDepartmentSelected(departmentId: number) {
    const screenAvailWidth = window.screen.availWidth;
    const screenAvailHeight = window.screen.availHeight;
    const url = `${window.location.origin}/departmentPYP/${departmentId}`;
    const options = `toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screenAvailWidth},height=${screenAvailHeight}`;
    window.open(url, '_blank' , options);
  }

  goBack() {
    this.router.navigate(['/manual-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
