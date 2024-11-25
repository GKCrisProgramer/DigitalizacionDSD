import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mproc-profile',
  templateUrl: './mproc-profile.component.html',
  styleUrl: './mproc-profile.component.css'
})
export class MProcProfileComponent implements OnInit{
  document: any;
  profileId!: number;
  documentRoute!: SafeResourceUrl; // URL segura

  // Combinar las inyecciones de dependencias en un solo constructor
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private router: Router,) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    // Llamada a la API para obtener el documento con ID 2
    this.http.get<any>(`${environment.apiUrl}/document/13`).subscribe(document=> {
      if (document && document.documentLinkRoute) {
        const unsafeUrl = `https://drive.google.com/file/d/${document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }, error => {
      console.error('Error al obtener el documento', error);
    });
  }
}
