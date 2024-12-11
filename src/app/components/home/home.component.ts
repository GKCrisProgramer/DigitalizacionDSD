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
  filteredData: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  search(event: any) {
    const query = event.query;

    this.http
      .get<any[]>(`${environment.apiUrl}/document-profile/searchProfilesAndDocuments?q=${query}`)
      .subscribe((data) => {
        this.filteredData = data.map((item) => ({
          label: `${item.profileName} > ${item.documentName || 'Sin manual relacionado'}`,
          value: item.profileId, // Puede usarse para redirigir o realizar acciones específicas
        }));
      });
  }

  // onItemSelect(event: any) {
  //   const profileId = event.value;
  //   this.router.navigate(['/profile/', profileId]);
  // }
  

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
