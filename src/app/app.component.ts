import { Component, HostListener } from '@angular/core';
import { excludedRoutes, currentPath } from '../global-settings/screem-path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digitalizacion';

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
    if (excludedRoutes.excluded.includes(currentPath.path)) {
      localStorage.removeItem('authToken');  
      event.preventDefault();  
      event.returnValue = '';
    }
  }
}
