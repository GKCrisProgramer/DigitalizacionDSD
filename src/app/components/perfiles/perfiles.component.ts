import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PerfilesService } from '../../services/perfiles.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit{

  documentRoute!: SafeResourceUrl;
  department: any[] = [];
  profile: any[] = [];
  selectedDepartment: number | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private perfilesService:PerfilesService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDepartaments();

    this.perfilesService.getDocument().subscribe(document=> {
      if (document && document.documentLinkRoute) {
        const unsafeUrl = `https://drive.google.com/file/d/${document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }, error => {
      console.error('Error al obtener el documento', error);
    });
  }

  getDepartaments() {
    this.perfilesService.getDepartments().subscribe(data => {
      this.department = data;
    }, error => {
      console.error('Error al obtener los departamentos', error);
    });
  }

  onDepartamentChange(event: any) {
    const departmentId = event.target.value;
    if (departmentId) {
      this.selectedDepartment = departmentId;
      this.perfilesService.onDepartmentChanges(departmentId).subscribe(data => {
        this.profile = data;
      }, error => {
        console.error('Error al obtener los puestos', error);
      });
    }
  }

  goBack() {
    this.router.navigate(['/org-list']);
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
