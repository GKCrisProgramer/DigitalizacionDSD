import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Digitalizacion';

  // Elimina el token antes de cerrar la ventana
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: BeforeUnloadEvent) {
  localStorage.removeItem('authToken');  // Eliminar el token
    // Opcional: mensaje de confirmación (navegadores modernos lo limitan)
    event.preventDefault();  
    event.returnValue = '';
  }
}
