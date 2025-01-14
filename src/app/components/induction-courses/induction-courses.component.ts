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

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute,
    private inductionCoursesService: InductionCoursesService,
  ) { }

  goBack() {
    this.router.navigate(['/Cursos-lista']);
  }

  ngOnInit(): void {
    this.documentId = Number(this.route.snapshot.paramMap.get('documentId')!);
  
    this.inductionCoursesService.getDocument(this.documentId).subscribe((doc) => {
      if (doc && doc.documentLinkRoute) {
        this.document = doc;
  
        const unsafeUrl = `https://drive.google.com/file/d/${doc.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        console.error("Documento no encontrado o estructura inesperada:", doc);
      }
    });
  }
}
