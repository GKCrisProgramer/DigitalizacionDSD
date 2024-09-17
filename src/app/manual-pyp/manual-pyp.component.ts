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
}
