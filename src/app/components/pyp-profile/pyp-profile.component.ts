import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentProfileService } from '../../services/pyp-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pyp-profile',
  templateUrl: './pyp-profile.component.html',
  styleUrl: './pyp-profile.component.css'
})
export class PypProfileComponent implements OnInit{
  document: any;
  profileId!: number;
  documentRoute!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private documentProfileService: DocumentProfileService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.profileId = Number(this.route.snapshot.paramMap.get('profileId')!);

    this.documentProfileService.getDocumentByProfile(this.profileId).subscribe((doc) => {
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
