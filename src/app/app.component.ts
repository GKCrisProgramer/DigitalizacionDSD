import { Component, HostListener } from '@angular/core';
import { isRouteExcluded } from '../global-settings/screem-path';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digitalizacion';
  constructor(private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    const currentRoute = this.router.url;
    if (!isRouteExcluded(currentRoute)) {
      localStorage.removeItem('authToken');
    }

    event.preventDefault();
    event.returnValue = '';
  }
}
