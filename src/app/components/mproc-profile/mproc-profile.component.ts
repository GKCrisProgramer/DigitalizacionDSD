import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentProcedureProceduraService } from '../../services/mproc-profile.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private documentProcedureProceduraService: DocumentProcedureProceduraService,
    private sanitizer: DomSanitizer,
  ) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {

    // Obtener el ID del puesto desde la URL
    this.profileId = Number(this.route.snapshot.paramMap.get('profileId')!);

    // Llamar al servicio para obtener el documento relacionado con el puesto
    this.documentProcedureProceduraService.getDocumentByProfile(this.profileId).subscribe((doc) => {
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
