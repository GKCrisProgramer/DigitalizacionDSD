import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
      password: this.password
    };
  
    this.http.post<any>('http://localhost:3000/user/login', loginData).subscribe(
      response => {
        if (response.success) {
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      error => {
        console.error('Error al intentar iniciar sesión', error);
      }
    );
  }
}

