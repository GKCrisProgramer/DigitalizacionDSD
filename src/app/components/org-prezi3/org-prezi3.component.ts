import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-prezi3',
  templateUrl: './org-prezi3.component.html',
  styleUrl: './org-prezi3.component.css'
})
export class OrganizationChartPrezi3Component {
  constructor(private router: Router) {}

  goBack(){
    this.router.navigate(['/org-list']);
  }
  goHome() {
    this.router.navigate(['/home']); 
  }
}
