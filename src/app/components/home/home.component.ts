import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [AutoCompleteModule, FormsModule],
  standalone: true,
})
export class HomeComponent {
  searchTerm: string = '';
  data: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  search(event: any) {
    const query = event.query;
  
    this.http.get<any[]>(`${environment.apiUrl}/profile/searchByQuery?q=${query}`).subscribe((data) => {
      this.data = data; // La respuesta ya contiene profileId y profileName
    });
  }

  goToManualList() {
    this.router.navigate(['/manual-list']);
  }

  goToIntro(){
    this.router.navigate(['/intro'])
  }

  goToPYP(){
    this.router.navigate(['/manual-detail'])
  }

  goToOrganigrama(){
    this.router.navigate(['/org-list'])
  }

  logout() {
    const confirmLogout = window.confirm('¿Desea salir del Manual?');
    if (confirmLogout) {
      localStorage.removeItem('authToken');  
      this.router.navigate(['/login']);   
    }
  }

  goToProcedures(){
    this.router.navigate(['/ProcedimientosList'])
  }

  goToInductionCourses(){
    this.router.navigate(['/Cursos-lista'])
  }
}
