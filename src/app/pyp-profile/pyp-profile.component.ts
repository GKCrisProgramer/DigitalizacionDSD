import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DocumentProfileService } from './Service/pyp-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-profile',
  templateUrl: './pyp-profile.component.html',
  styleUrl: './pyp-profile.component.css'
})
export class PypProfileComponent implements OnInit{
  document: any;
  idProfile!: number;
  documentRoute!: SafeResourceUrl; // URL segura
  
  // Combinar las inyecciones de dependencias en un solo constructor
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private documentProfileService: DocumentProfileService,
    private sanitizer: DomSanitizer) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/manual-detail']);
  }

  // Lógica que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtener el ID del puesto desde la URL
    this.idProfile = +this.route.snapshot.paramMap.get('idPuesto')!;

    // Llamar al servicio para obtener el documento relacionado con el puesto
    this.documentProfileService.getDocumentByProfile(this.idProfile).subscribe((doc) => {
      this.document = doc;

      // Ahora que tenemos el documento, generar la URL segura
      const unsafeUrl = `https://drive.google.com/file/d/${this.document.document.Document_LinkRoute}/preview`;
      this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
    });
  }

}
