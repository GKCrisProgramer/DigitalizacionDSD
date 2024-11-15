import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { DepartmentDocumentService } from '../../services/departamento-documentos.service';
import * as go from 'gojs';
import { SideTreeLayout, isAssistant } from './functions/Assistance-SideThree.functions';
import { categoryColors } from './functions/category-colors';

@Component({
  selector: 'app-organigrama',
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent implements AfterViewInit {
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

  @ViewChild('diagramDiv', { static: true }) diagramDiv!: ElementRef;

  private initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, this.diagramDiv.nativeElement, {
      allowCopy: false,
      allowDelete: false,
      allowMove: false,
      initialAutoScale: go.Diagram.UniformToFill,
      layout: new SideTreeLayout({
        treeStyle: go.TreeStyle.LastParents,
        arrangement: go.TreeArrangement.Horizontal,
        angle: 90,
        layerSpacing: 35,
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeAlignment.Bus,
        alternateNodeSpacing: 20,
      }),
      'undoManager.isEnabled': true
    });

    // Node template
    diagram.nodeTemplate = $(go.Node, 'Spot',
      {
        isShadowed: true, shadowOffset: new go.Point(0, 2),
        mouseEnter: (e, node) => this.showChildIndicator(node as go.Node),
        mouseLeave: (e, node) => this.hideChildIndicator(node as go.Node)
      },
      $(go.Panel, 'Auto',
        $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 },
          new go.Binding('fill', 'category', cat => categoryColors[cat] || '#BBD6EE')
        ),
        $(go.TextBlock, { margin: 8, textAlign: 'center' }, new go.Binding('text', 'name'))
      ),
      $(go.Shape, 'Circle', { name: 'CHILD_INDICATOR', width: 10, height: 10, fill: 'green', strokeWidth: 0, alignment: go.Spot.BottomCenter, alignmentFocus: go.Spot.Bottom, visible: false }),
      $('TreeExpanderButton', { _treeExpandedFigure: 'LineUp', _treeCollapsedFigure: 'LineDown', alignment: go.Spot.Bottom, opacity: 0 })
        .bind('opacity', 'isSelected', (s: boolean) => (s ? 1 : 0))
    );

    // Link template
    diagram.linkTemplate = $(go.Link, { routing: go.Link.Orthogonal, corner: 10, selectable: false },
      $(go.Shape, { strokeWidth: 2, stroke: '#424242' })
    );

    return diagram;
  }

  private showChildIndicator(node: go.Node): void {
    const indicator = node.findObject('CHILD_INDICATOR');
    if (indicator) {
      indicator.visible = node.findTreeChildrenNodes().count > 0;
    }
  }

  private hideChildIndicator(node: go.Node): void {
    const indicator = node.findObject('CHILD_INDICATOR');
    if (indicator) {
      indicator.visible = false;
    }
  }

  ngAfterViewInit(): void {
    const diagram = this.initDiagram();
    // Ejemplo de nodos para probar el diagrama
    diagram.model = new go.TreeModel([

      { key: 1, name: 'Consejo de Administración', category: 'VMOM' },

      { key: 6, parent: 1, name: 'Presidente' , category: 'VMOM' },
      //VMOM
      { key: 4, parent: 6, name: 'Asistente / Recepción', category: 'Recepcion', isAssistant: true },
      { key: 5, parent: 4, name: 'Vigilancia', category: 'VMOM' },
      { key: 7, parent: 4, name: 'Mantenimiento Edificio', category: 'VMOM' },
      { key: 8, parent: 4, name: 'Aseo y Limpieza', category: 'VMOM' },
      { key: 9, parent: 6, name: 'Coordinador Transporte', category: 'VMOM', isAssistant: true },
      { key: 10, parent: 9, name: 'Mantenimiento de Vehículos', category: 'VMOM' },
      { key: 11, parent: 9, name: 'Auxiliares Admon. de Flotilla', category: 'VMOM' },
      //VOSE
      { key: 2, parent: 6, name: 'Director General', category: 'VOSE' },
      { key: 12, parent: 2, name: 'Asistente',  category: 'VOSE', isAssistant: true },
      { key: 13, parent: 12, name: 'Cordinador Logística Kiosko', category: 'VOSE' },
      { key: 14, parent: 13, name: 'Auxiliar Admvo (Log. Kiosko)', category: 'VOSE' },

      { key: 15, parent: 2, name: 'Cordinador de Auditoría',  category: 'VOSE', isAssistant: true },
      { key: 16, parent: 15, name: 'Auditores', category: 'VOSE' },
      //EZL
      { key: 3, parent: 2, name: 'Gerente General', category: 'EZL' },
      { key: 17, parent: 3, name: 'Asistente', category: 'EZL', isAssistant: true },

      //CIO
      { key: 18, parent: 3, name: 'Gerente Comercial, Distribución y Logística', category: 'CIOC'},
      { key: 19, parent: 18, name: 'Asistente', category: 'CIO', isAssistant: true},
      { key: 20, parent: 18, name: 'Analista de Datos', category: 'CIO', isAssistant: true},

      { key: 21, parent: 18, name: 'Coord. de Venta de Zona 1', category: 'CIO' },
      { key: 22, parent: 21, name: 'Gerentes de CEDIS (1)', category: 'CIO' },
      { key: 23, parent: 22, name: 'Supervisores de Ventas', category: 'CIO' },
      { key: 24, parent: 23, name: 'Vendedores', category: 'CIO' },
      { key: 25, parent: 22, name: 'Encargados Administrativos', category: 'CIO' },
      { key: 26, parent: 22, name: 'Mecánicos', category: 'CIO' },
      { key: 27, parent: 25, name: 'Encargado de Almacen', category: 'CIO' },
      { key: 72, parent: 27, name: 'Auxiliar de Almacenista', category: 'CIO' },

      { key: 28, parent: 18, name: 'Coord. de Venta de Zona 2', category: 'CIO' },
      { key: 29, parent: 28, name: 'Gerentes de CEDIS (2)', category: 'CIO' },
      { key: 30, parent: 29, name: 'Supervisor de Ventas', category: 'CIO' },
      { key: 31, parent: 30, name: 'Vendedores', category: 'CIO' },
      { key: 32, parent: 29, name: 'Encargados Administrativos', category: 'CIO' },
      { key: 33, parent: 29, name: 'Mecánicos', category: 'CIO' },
      { key: 34, parent: 32, name: 'Encargado de Almacen', category: 'CIO' },
      { key: 73, parent: 34, name: 'Auxiliar de Almacenista', category: 'CIO' },

      { key: 35, parent: 18, name: 'Coordinador de SIC', category: 'CIO' },
      { key: 36, parent: 35, name: 'IMA', category: 'CIO' },
      { key: 37, parent: 35, name: 'Exhibidores', category: 'CIO' },
      { key: 38, parent: 35, name: 'Monitoreo (TyM)', category: 'CIO' },
      { key: 39, parent: 35, name: 'Iniciativas Ejecución', category: 'CIO' },
      { key: 40, parent: 35, name: 'Instructor de Venta', category: 'CIO' },

      { key: 41, parent: 18, name: 'Analista de Mercancías', category: 'CIO' },

      { key: 42, parent: 18, name: 'RH -Capacitación y Desarrollo del Talento Humano', category: 'CIO' },
      { key: 43, parent: 42, name: 'Reclutamiento y Contratación de Personal', category: 'CIO' },
      { key: 44, parent: 42, name: 'Capacitación y Adiestramiento', category: 'CIO' },

      //PVM
      { key: 45, parent: 3, name: 'Gerente de Administración, Contabilidad y Finanzas', category: 'PVMC' },

      { key: 46, parent: 45, name: 'Asistente', category: 'PVM', isAssistant: true },

      { key: 47, parent: 45, name: 'Manuales y Procesos Organizacionales', category: 'PVM' },

      { key: 48, parent: 45, name: 'Coordinador de Servicios Administrativos a CEDIS', category: 'PVM' },
      { key: 49, parent: 48, name: 'VMI (Compras)', category: 'PVM' },
      { key: 50, parent: 48, name: 'Control Inventarios', category: 'PVM' },
      { key: 51, parent: 48, name: 'Iniciativas de Ventas', category: 'PVM' },
      { key: 52, parent: 48, name: 'Operación CEDIS', category: 'PVM' },
      { key: 53, parent: 48, name: 'Capacitador Administración CEDIS', category: 'PVM' },

      { key: 54, parent: 48, name: 'Gestor de Cartera', category: 'PVM' },
      { key: 55, parent: 54, name: 'Auxiliar Administrativo de Cartera', category: 'PVM' },

      { key: 56, parent: 48, name: 'Auditores Operativos de CEDIS (Presenciales y Virtuales)', category: 'PVM' },

      { key: 57, parent: 45, name: 'Contador General', category: 'PVM' },

      { key: 58, parent: 57, name: 'Delegado Contable', category: 'PVM' },
      { key: 59, parent: 58, name: 'Auxiliares Contables', category: 'PVM' },

      { key: 60, parent: 57, name: 'Delegado Fiscal', category: 'PVM' },
      { key: 61, parent: 60, name: 'Auxiliares de Área Fiscal', category: 'PVM' },

      { key: 62, parent: 57, name: 'Nóminas y Prestaciones', category: 'PVM' },
      { key: 63, parent: 62, name: 'Auxiliar de Nóminas y Prestaciones', category: 'PVM' },

      { key: 64, parent: 45, name: 'Tesorería', category: 'PVM' },

      { key: 65, parent: 45, name: 'Analista Financiero', category: 'PVM' },
      { key: 66, parent: 65, name: 'Auxiliar Análisis Financieros', category: 'PVM' },

      //TI
      { key: 68, parent: 3, name: 'Coordinador de TI', category: 'TI' },
      { key: 69, parent: 68, name: 'Encargado de Programación', category: 'TI' },
      { key: 70, parent: 69, name: 'Programadores', category: 'TI' },
      { key: 71, parent: 70, name: 'Asistencia y Soporte Técnico', category: 'TI' },

    ]);

  }

}
