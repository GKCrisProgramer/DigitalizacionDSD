import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/home']); 
  }
  goHome() {
    this.router.navigate(['/home']);  
  }
}
