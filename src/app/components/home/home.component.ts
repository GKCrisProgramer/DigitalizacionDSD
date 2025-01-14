import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HomeService } from '../../services/home.service';

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

  constructor(private router: Router, private homeService: HomeService) {}

  search(event: any) {
    const query = event.query;
    this.homeService.searchProfilesAndDocuments(query).subscribe((data) => {
      this.filteredData = data.map((item) => ({
        label: `${item.profileName} > ${item.documentName || 'Sin manual relacionado'}`,
        value: item.profileId,
      }));
    });
  }


  onItemSelect(event: any) {
    const profileId = event.value?.value; 
    this.router.navigate(['/profile/', profileId]); 
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
