import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-prezi2',
  templateUrl: './org-prezi2.component.html',
  styleUrl: './org-prezi2.component.css'
})
export class OrganizationChartPrezi2Component {
  constructor(private router: Router) {}

  goBack(){
    this.router.navigate(['/org-list']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
