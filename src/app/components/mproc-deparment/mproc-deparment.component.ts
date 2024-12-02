import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentProcedureDeparmentService } from '../../services/mproc-department.service';

@Component({
  selector: 'app-mproc-deparment',
  templateUrl: './mproc-deparment.component.html',
  styleUrl: './mproc-deparment.component.css'
})
export class MprocDeparmentComponent {
  document: any;
  departmentId!: number;
  documentRoute!: SafeResourceUrl; // URL segura

  // Combinar las inyecciones de dependencias en un solo constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentProcedureDeparmentService: DocumentProcedureDeparmentService,
    private sanitizer: DomSanitizer,
  ) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/ProcedimientosList']);
  }

  ngOnInit(): void {

    // Obtener el ID del puesto desde la URL
    this.departmentId = Number(this.route.snapshot.paramMap.get('departmentId')!);

    // Llamar al servicio para obtener el documento relacionado con el puesto
    this.documentProcedureDeparmentService.getDocumentByDepartment(this.departmentId).subscribe((doc) => {
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
