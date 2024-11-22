import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrl: './org-list.component.css'
})
export class OrgListComponent {
  constructor(private router: Router) {}

  goToOrganizationChart(){
    this.router.navigate(['/organization-chart'])
  }
  goToAuthorizedOrganizationChart(){
    this.router.navigate(['/org-PPTX'])
  }
  goToPrezi1(){
    this.router.navigate(['/org-Prezi2'])
  }
  goToPrezi2(){
    this.router.navigate(['/org-Prezi3'])
  }
  goToStart(){
    this.router.navigate(['/home']) // Navega a la pantalla de inicio
  }
  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  goToProfiles(){
    this.router.navigate(['/ProfileList'])
  }
}
