import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verifica si el usuario tiene un token en el localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      return true; // Permite acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login
      return false; // Bloquea el acceso
    }
  }
}
