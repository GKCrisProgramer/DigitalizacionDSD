import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //RUTAS DE MOVIEMIENTO DE LOS BOTONES
  constructor(private router: Router) {}

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
      localStorage.removeItem('authToken');  // Eliminar el token
      this.router.navigate(['/login']);   // Redirigir a la página de inicio de sesión
    }
  }

  goToProcedures(){
    this.router.navigate(['/Procedimientos'])
  }

  goToInductionCourses(){
    this.router.navigate(['/Cursos-Induccion'])
  }
}
