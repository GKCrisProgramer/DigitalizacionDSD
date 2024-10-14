import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-department',
  templateUrl: './pyp-department.component.html',
  styleUrl: './pyp-department.component.css'
})
export class PypDepartmentComponent /*implements OnInit*/{
  constructor(private router: Router) {}

  perfiles = ['Auditor interno operativo de cedis', 'Auxiliar de inventario', 'Auxiliar de operaciones', 'Compras', 'Aux. Administrativo (Iniciativas)', 'Aux. Administrativo Operaciones CEDIS', 'Capacitador de administrativo de CEDIS', 'estor De Cartera', 'Aux. Administrativo (Cartera)', 'Auditor Interno Operativo de CEDIS', 'Coordinador Logística Kiosko', 'Aux. Administrativo  (Logística Kiosko)'];

  goToProfile(profileId: Number){
    this.router.navigate(['/profile', profileId])
  }

  goBack(){
    this.router.navigate(['/manual-detail'])
  }

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }

  gotoOrganigrama() {
    this.router.navigate(['/organigrama']);  // Cambia '/home' según la ruta deseada
  }
}
