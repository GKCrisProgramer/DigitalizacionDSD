import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manual-list',
  templateUrl: './manual-list.component.html',
  styleUrl: './manual-list.component.css'
})

export class ManualListComponent {
  constructor(private router: Router) {}

  goToManualDetail() {
    this.router.navigate(['/manual-detail']);  
  }
  goToStart(){
    this.router.navigate(['/home']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
