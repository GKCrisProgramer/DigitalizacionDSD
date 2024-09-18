import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-department',
  templateUrl: './pyp-department.component.html',
  styleUrl: './pyp-department.component.css'
})
export class PypDepartmentComponent /*implements OnInit*/{
  constructor(private router: Router) {}

  perfiles = ['Perfil 1', 'Perfil 2', 'Perfil 3', 'Perfil 4', 'Perfil 5', 'Perfil 6', 'Perfil 7', 'Perfil 8'];

  goToProfile(profileId: Number){
    this.router.navigate(['/profile', profileId])
  }

  goBack(){
    this.router.navigate(['/manual-detail'])
  }

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }
  //departmentId: number;

  /*constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id');
    // Aquí podrías hacer una llamada al backend para obtener los detalles del departamento según el ID
  }*/
}
