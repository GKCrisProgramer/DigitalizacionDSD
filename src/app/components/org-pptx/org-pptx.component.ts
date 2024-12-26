import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-pptx',
  templateUrl: './org-pptx.component.html',
  styleUrl: './org-pptx.component.css'
})
export class OrgPPTXComponent {

  constructor(private router: Router) {}

  goBack(){
    this.router.navigate(['/org-list']);
  }
  goHome() {
    this.router.navigate(['/home']);
  }
}
