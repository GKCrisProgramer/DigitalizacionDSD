import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { InductionCoursesService } from '../../services/induction-courses.service';

@Component({
  selector: 'app-induction-courses',
  templateUrl: './induction-courses.component.html',
  styleUrls: ['./induction-courses.component.css']
})
export class InductionCoursesComponent implements AfterViewInit{
  document: any;
  documentId!: number;
  documentRoute!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private inductionCoursesService: InductionCoursesService,
  ) { }

  ngAfterViewInit(): void {
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
