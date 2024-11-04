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
  profileId!: number;
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
    this.profileId = Number(this.route.snapshot.paramMap.get('profileId')!);

    // Llamar al servicio para obtener el documento relacionado con el puesto
    this.documentProfileService.getDocumentByProfile(this.profileId).subscribe((doc) => {
    // Verificar si el documento tiene la estructura esperada
      if (doc && doc.document && doc.document.documentLinkRoute) {
        this.document = doc;
    
        // Generar la URL segura con la ruta correcta
        const unsafeUrl = `https://drive.google.com/file/d/${doc.document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        console.error("Documento no encontrado o estructura inesperada:", doc);
      }
    });
  }
}
