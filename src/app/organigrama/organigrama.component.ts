import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DepartamentoDocumentosService } from './Service/departamento-documentos.service'; // Servicio que usaremos
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent implements OnInit {
  departamentos: any[] = []; // Lista de departamentos
  documentoRuta: SafeResourceUrl | null = null; // Permitir que sea null
  mensaje: string = ''; // Mensaje para mostrar si no hay documentos
// Ruta segura para el visor de PDF

  constructor(
    private router: Router,
    private departamentoDocumentosService: DepartamentoDocumentosService, // Servicio para obtener datos
    private sanitizer: DomSanitizer, // Para convertir las URLs en rutas seguras
    private http: HttpClient
  ) {}

  goHome() {
    this.router.navigate(['/home']);  // Cambia '/home' según la ruta deseada
  }

  ngOnInit() {
    // Cargar la lista de departamentos al inicializar el componente
    this.departamentoDocumentosService.getDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  // Función para seleccionar un departamento y cargar el documento correspondiente
  seleccionarDepartamento(idDepartamento: number) {
    console.log('Departamento seleccionado:', idDepartamento);
    this.departamentoDocumentosService.getDocumentoByDepartamento(idDepartamento).subscribe((documento) => {
      console.log('Documento recibido:', documento); // Esto debería imprimir la respuesta
      if (documento && documento[0]?.Documentos_RutaLink) { // Aquí se asume que documento es un array
        const unsafeUrl = `https://drive.google.com/file/d/${documento[0].Documentos_RutaLink}/preview`;
        console.log('URL del documento:', unsafeUrl); // Agrega este log
        this.documentoRuta = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.mensaje = ''; // Limpia el mensaje si hay documento
      } else {
        this.documentoRuta = null; // Limpia el documento si no hay
        this.mensaje = 'No existe documento para este departamento'; // Asigna el mensaje
      }
    });
  }

  // Función para ver el Organigrama General (documento con ID 3)
  verOrganigramaGeneral() {
    this.http.get<any>('http://localhost:3000/documentos/3').subscribe(documento => {
      console.log('Documento General recibido:', documento); // Log para depurar
      if (documento && documento.Documentos_RutaLink) {
        const unsafeUrl = `https://drive.google.com/file/d/${documento.Documentos_RutaLink}/preview`;
        this.documentoRuta = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
        this.mensaje = ''; // Limpia el mensaje si se muestra el documento general
      } else {
        this.documentoRuta = null; // Limpia el documento si no hay
        this.mensaje = 'No existe documento general disponible'; // Mensaje en caso de error
      }
    });
  }
}
