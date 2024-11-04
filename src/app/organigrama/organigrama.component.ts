import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DepartmentDocumentService } from './Service/departamento-documentos.service'; // Servicio que usaremos
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent implements OnInit {
  deparments: any[] = []; // Lista de departamentos
  documentRoute: SafeResourceUrl | null = null; // Permitir que sea null
  message: string = ''; // Mensaje para mostrar si no hay documentos
// Ruta segura para el visor de PDF

  constructor(
    private router: Router,
    private departmentDocumentService: DepartmentDocumentService, // Servicio para obtener datos
    private sanitizer: DomSanitizer, // Para convertir las URLs en rutas seguras
    private http: HttpClient
  ) {}

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }

  goBack() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }

  ngOnInit() {
    // Cargar la lista de departamentos al inicializar el componente
    this.departmentDocumentService.getDepartments().subscribe((deparments) => {
      this.deparments = deparments;
    });
  }

  // Función para seleccionar un departamento y cargar el documento correspondiente
  SelectDepartment(idDepartment: number) {
    console.log('Departamento seleccionado:', idDepartment);
    this.departmentDocumentService.getDocumentsbyDepartment(idDepartment).subscribe((document) => {
      console.log('Documento recibido:', document); // Esto debería imprimir la respuesta
      if (document && document[0]?.documentLinkRoute) { // Aquí se asume que documento es un array
        const unsafeUrl = `https://drive.google.com/file/d/${document[0].documentLinkRoute}/preview`;
        console.log('URL del documento:', unsafeUrl); // Agrega este log
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.message = ''; // Limpia el mensaje si hay documento
      } else {
        this.documentRoute = null; // Limpia el documento si no hay
        this.message = 'No existe documento para este departamento'; // Asigna el mensaje
      }
    });
  }

  // Función para ver el Organigrama General (documento con ID 3)
  seeGeneralOrganizationChart() {
    this.http.get<any>('http://localhost:3000/document/3').subscribe(document => {
      console.log('Documento General recibido:', document); // Log para depurar
      if (document && document.documentLinkRoute) {
        const unsafeUrl = `https://drive.google.com/file/d/${document.documentLinkRoute}/preview`;
        this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.message = ''; // Limpia el mensaje si se muestra el documento general
      } else {
        this.documentRoute = null; // Limpia el documento si no hay
        this.message = 'No existe documento general disponible'; // Mensaje en caso de error
      }
    });
  }
}
