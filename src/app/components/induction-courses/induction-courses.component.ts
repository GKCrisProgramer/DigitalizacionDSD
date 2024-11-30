import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { InductionCoursesService } from '../../services/induction-courses.service';

@Component({
  selector: 'app-induction-courses',
  templateUrl: './induction-courses.component.html',
  styleUrl: './induction-courses.component.css'
})
export class InductionCoursesComponent implements OnInit{
  document: any;
  documentId!: number;
  documentRoute!: SafeResourceUrl; // URL segura

  // Combinar las inyecciones de dependencias en un solo constructor
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private inductionCoursesService: InductionCoursesService,
  ) { }

  // Método para navegar a la página de detalle del manual
  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.documentId = Number(this.route.snapshot.paramMap.get('documentId')!);
  
    this.inductionCoursesService.getDocument(this.documentId).subscribe((doc) => {
      // Verificar si el documento tiene la estructura esperada
      if (doc && doc.documentLinkRoute) { // Ajusta la verificación a la estructura real
        this.document = doc;
  
        // Generar la URL segura con la ruta correcta
        const unsafeUrl = `https://drive.google.com/file/d/${doc.documentLinkRoute}/preview`; // Accede directamente
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        console.error("Documento no encontrado o estructura inesperada:", doc);
      }
    });
  }
}
