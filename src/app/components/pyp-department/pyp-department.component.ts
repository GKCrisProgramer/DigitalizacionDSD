import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DepartmentDocumentService } from '../../services/departamento-documentos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-department',
  templateUrl: './pyp-department.component.html',
  styleUrl: './pyp-department.component.css'
})
export class PypDepartmentComponent implements OnInit{
  document: any;
  departmentId!: number;
  documentRoute!: SafeResourceUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentDocumentService: DepartmentDocumentService,
    private sanitizer: DomSanitizer
  ) { }

  goBack() {
    this.router.navigate(['/manual-detail']);
  }

  ngOnInit() {
    this.departmentId = Number(this.route.snapshot.paramMap.get('departmentId')!);

    this.departmentDocumentService.getDocumentByDepartmentInDetail(this.departmentId).subscribe((doc) => {
      if (doc && doc.document && doc.document.documentLinkRoute) {
        this.document = doc;

        const unsafeUrl = `https://drive.google.com/file/d/${doc.document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      } else {
        console.error("Documento no encontrado o estructura inesperada:", doc);
      }
    });
  }
}
