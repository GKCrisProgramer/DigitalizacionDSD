import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocumentProcedureDeparmentService } from '../../services/mproc-department.service';

@Component({
  selector: 'app-mproc-deparment',
  templateUrl: './mproc-deparment.component.html',
  styleUrl: './mproc-deparment.component.css'
})
export class ManualprocDeparmentComponent implements OnInit{
  document: any;
  departmentId!: number;
  documentRoute!: SafeResourceUrl; 

  constructor(
    private route: ActivatedRoute,
    private documentProcedureDeparmentService: DocumentProcedureDeparmentService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.departmentId = Number(this.route.snapshot.paramMap.get('departmentId')!);

    this.documentProcedureDeparmentService.getDocumentByDepartment(this.departmentId).subscribe((doc) => {
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
