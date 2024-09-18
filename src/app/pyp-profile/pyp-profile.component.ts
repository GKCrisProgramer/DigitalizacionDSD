import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-profile',
  templateUrl: './pyp-profile.component.html',
  styleUrl: './pyp-profile.component.css'
})
export class PypProfileComponent implements OnInit{

  pdfSrc = "assets/pdf/example.pdf";  // Ruta local o URL del PDF

  // Combinar las inyecciones de dependencias en un solo constructor
  constructor(private router: Router, private route: ActivatedRoute) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/manual-detail']);
  }

  // Lógica que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Si necesitas manejar algún parámetro de la ruta o lógica adicional, colócalo aquí
    // Ejemplo de uso de "route" si necesitas parámetros de la URL
    // const profileId = this.route.snapshot.paramMap.get('id');
    // Aquí podrías hacer una llamada al backend según el "profileId"
  }
  /*
  //profileId: number;
  //constructor(private route: ActivatedRoute) {}
  constructor(private router: Router){}
  goBack(){
    this.router.navigate(['/manual-detail'])
  }

  pdfSrc = "assets/pdf/example.pdf";  // Ruta local o URL del PDF

  constructor() { }

  ngOnInit(): void {
  }

  /*ngOnInit(): void {
    this.profileId = +this.route.snapshot.paramMap.get('id');
    // Aquí podrías hacer una llamada al backend para obtener los detalles del perfil según el ID
  }
  */

}
