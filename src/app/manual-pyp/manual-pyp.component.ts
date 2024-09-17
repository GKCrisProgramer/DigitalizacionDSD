import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-pyp',
  templateUrl: './manual-pyp.component.html',
  styleUrl: './manual-pyp.component.css'
})
export class ManualPYPComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['/manual-list']);  // Ajusta la ruta según la pantalla a la que quieras volver
  }

  goToDepartment(departmentId: number) {
    this.router.navigate(['/department', departmentId]);  // Navega a la pantalla del departamento
  }

  goToProfile(profileId: number) {
    this.router.navigate(['/profile', profileId]);  // Navega a la pantalla del perfil
  }

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  
}
