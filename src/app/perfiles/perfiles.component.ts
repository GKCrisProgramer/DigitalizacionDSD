import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'] // Asegúrate que sea style**s**Url si es array
})
export class PerfilesComponent implements OnInit{

  documentoRuta!: SafeResourceUrl;  // Para el enlace seguro del PDF
  departamentos: any[] = [];        // Lista de departamentos
  puestos: any[] = [];              // Lista de puestos para el departamento seleccionado
  selectedDepartamento: number | null = null; // ID del departamento seleccionado
  
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getDepartamentos(); // Cargar los departamentos al inicializar
    
    // Llamada a la API para obtener el documento con ID 2
    this.http.get<any>('http://localhost:3000/documentos/2').subscribe(documento => {
      if (documento && documento.Documentos_RutaLink) {
        const unsafeUrl = `https://drive.google.com/file/d/${documento.Documentos_RutaLink}/preview`;
        this.documentoRuta = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
      }
    }, error => {
      console.error('Error al obtener el documento', error);
    });
  }

  // Obtener todos los departamentos desde el backend
  getDepartamentos() {
    this.http.get<any[]>('http://localhost:3000/departamento')
      .subscribe(data => {
        this.departamentos = data;
      }, error => {
        console.error('Error al obtener los departamentos', error);
      });
  }

  // Obtener los puestos cuando se selecciona un departamento
  onDepartamentoChange(event: any) {
    const departamentoId = event.target.value;
    if (departamentoId) {
      this.selectedDepartamento = departamentoId;
      this.http.get<any[]>(`http://localhost:3000/departamento-puesto/${departamentoId}/puestos`)
        .subscribe(data => {
          this.puestos = data;
        }, error => {
          console.error('Error al obtener los puestos', error);
        });
    }
  }

  // Navegar de regreso a 'home'
  goBack() {
    this.router.navigate(['/home']);  
  }
  
  goHome() {
    this.router.navigate(['/home']);  
  }
}
