import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DepartamentoDocumentosService } from './Service/departamento-documentos.service'; // Servicio que usaremos
import { Router } from '@angular/router';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent implements OnInit {
  departamentos: any[] = []; // Lista de departamentos
  documentoRuta: SafeResourceUrl | null = null; // Permitir que sea null
  // Ruta segura para el visor de PDF

  constructor(
    private router: Router,
    private departamentoDocumentosService: DepartamentoDocumentosService, // Servicio para obtener datos
    private sanitizer: DomSanitizer // Para convertir las URLs en rutas seguras
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


  mensaje: string = ''; // Mensaje para mostrar si no hay documentos

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
}
