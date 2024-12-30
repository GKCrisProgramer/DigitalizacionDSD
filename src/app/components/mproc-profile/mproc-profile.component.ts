import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DocumentProcedureProceduraService } from '../../services/mproc-profile.service';

@Component({
  selector: 'app-mproc-profile',
  templateUrl: './mproc-profile.component.html',
  styleUrl: './mproc-profile.component.css'
})
export class ManualProcProfileComponent implements OnInit{
  document: any;
  profileId!: number;
  documentRoute!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private documentProcedureProceduraService: DocumentProcedureProceduraService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {

    this.profileId = Number(this.route.snapshot.paramMap.get('profileId')!);

    this.documentProcedureProceduraService.getDocumentByProfile(this.profileId).subscribe((doc) => {
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
