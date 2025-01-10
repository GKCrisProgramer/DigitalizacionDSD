import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HomeService } from '../../services/home.service';
import { debounceTime } from 'rxjs';

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
    this.homeService.searchProfilesCoursesAndDepartmentsWithDocuments(query)
    .pipe(debounceTime(300)) 
    .subscribe((data) => {
      this.filteredData = data.map((item) => ({
        label: `${item.name} > ${item.documentName}`,
        value: { id: item.id, type: item.type , categoryId: item.categoryId},
      }));
    });
  }
  
  onItemSelect(event: any) {
    const id = event.value?.value.id;  
    const type = event.value?.value.type;
    const category = event.value?.value.categoryId; 
    const options = 'toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,fullscreen=yes';

    if (type === 'profile') {
      switch (category) {
        case 1:
          const url1 = `${window.location.origin}/profilePYP/${id}`;
          window.open(url1, '_blank', options);
          break;
        case 2:
          console.log("entro a case 2");
          break;
        case 3 :
          const url3 = `${window.location.origin}/departmentPYP/${id}`;
          window.open(url3, '_blank', options);
          break;
        default:
          break;
      }
    } else if (type === 'department') {
      switch (category) {
        case 1:
          const url1 = `${window.location.origin}/ProcedimientosProfile/${id}`;
          window.open(url1, '_blank', options);
          break;
        case 2:
          console.log("entro a case 2");
          break;
        case 3 :
          const url3 = `${window.location.origin}/ProcedimientosDepartment/${id}`;
          window.open(url3, '_blank', options);
          break;
        default:
          break;
      }
    } else if (type === 'course') {
      const url = `${window.location.origin}/Cursos-Induccion/${id}`;
      window.open(url, '_blank', options);
    }
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
