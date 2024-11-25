import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };
  
    this.http.post<any>(`${environment.apiUrl}/user/login`, loginData).subscribe(
      (response) => {
        if (response.success) {
          // Almacena el token en el localStorage
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']); // Redirige al home
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Error al intentar iniciar sesión', error);
      }
    );
  }  
}

