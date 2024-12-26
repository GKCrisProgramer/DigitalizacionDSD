import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };
  
    this.loginService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.success) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/home']); 
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

