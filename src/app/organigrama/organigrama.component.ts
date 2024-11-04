import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DepartmentDocumentService } from './Service/departamento-documentos.service'; // Servicio que usaremos
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as go from 'gojs';


const isAssistant = (n: any) => {
  if (n === null) return false;
  return n.data.isAssistant;
}

// An assistant node may have its own assistant nodes.
class SideTreeLayout extends go.TreeLayout {
  constructor(init: any) {
    super();
    if (init) Object.assign(this, init);
  }

  override makeNetwork(coll: any): any {
    const net = super.makeNetwork(coll);
    // copy the collection of TreeVertexes, because we will modify the network
    const vertexcoll = new go.Set(/*go.TreeVertex*/);
    vertexcoll.addAll(net.vertexes);
    for (const it = vertexcoll.iterator; it.next(); ) {
      const parent = it.value as any;
      // count the number of assistants
      let acount = 0;
      const ait = parent.destinationVertexes;
      while (ait.next()) {
        if (isAssistant(ait.value.node)) acount++;
      }
      // if a vertex has some number of children that should be assistants
      if (acount > 0) {
        // remember the assistant edges and the regular child edges
        const asstedges = new go.Set(/*go.TreeEdge*/) as any;
        const childedges = new go.Set(/*go.TreeEdge*/) as any;
        let eit = parent.destinationEdges;
        while (eit.next()) {
          const e = eit.value;
          if (isAssistant(e.toVertex.node)) {
            asstedges.add(e);
          } else {
            childedges.add(e);
          }
        }
        // first remove all edges from PARENT
        eit = asstedges.iterator;
        while (eit.next()) {
          parent.deleteDestinationEdge(eit.value);
        }
        eit = childedges.iterator;
        while (eit.next()) {
          parent.deleteDestinationEdge(eit.value);
        }
        // if the number of assistants is odd, add a dummy assistant, to make the count even
        if (acount % 2 == 1) {
          const dummy = net.createVertex();
          net.addVertex(dummy);
          net.linkVertexes(parent, dummy, asstedges.first().link);
        }
        // now PARENT should get all of the assistant children
        eit = asstedges.iterator;
        while (eit.next()) {
          parent.addDestinationEdge(eit.value);
        }
        // create substitute vertex to be new parent of all regular children
        const subst = net.createVertex();
        net.addVertex(subst);
        // reparent regular children to the new substitute vertex
        eit = childedges.iterator;
        while (eit.next()) {
          const ce = eit.value;
          ce.fromVertex = subst;
          subst.addDestinationEdge(ce);
        }
        // finally can add substitute vertex as the final odd child,
        // to be positioned at the end of the PARENT's immediate subtree.
        const newedge = net.linkVertexes(parent, subst, null);
      }
    }
    return net;
  }

  override assignTreeVertexValues(v: any) {
    // if a vertex has any assistants, use Bus alignment
    let any = false;
    const children = v.children;
    for (let i = 0; i < children.length; i++) {
      const c = children[i];
      if (isAssistant(c.node)) {
        any = true;
        break;
      }
    }
    if (any) {
      // this is the parent for the assistant(s)
      v.alignment = go.TreeAlignment.Bus; // this is required
      v.nodeSpacing = 50; // control the distance of the assistants from the parent's main links
    } else if (v.node == null && v.childrenCount > 0) {
      // found the substitute parent for non-assistant children
      //v.alignment = go.TreeAlignment.CenterChildren;
      //v.breadthLimit = 3000;
      v.layerSpacing = 0;
    }
  }
  
  override commitLinks() {
    super.commitLinks();
    // make sure the middle segment of an orthogonal link does not cross over the assistant subtree
    const eit = this?.network?.edges?.iterator ?? null;
    if (eit === null) {
      return;
    }
    while (eit.next()) {
      const e = eit.value;
      if (e.link == null) continue;
      const r = e.link;
      // does this edge come from a substitute parent vertex?
      const subst = e.fromVertex as any;
      if (subst === null) {
        return;
      }
      if (subst.node == null && r.routing == go.Routing.Orthogonal) {
        r.updateRoute();
        r.startRoute();
        // middle segment goes from point 2 to point 3
        const p1 = subst.center; // assume artificial vertex has zero size
        const p2 = r.getPoint(2).copy();
        const p3 = r.getPoint(3).copy();
        const p5 = r.getPoint(r.pointsCount - 1);
        let dist = 10;
        if (subst.angle == 270 || subst.angle == 180) dist = -20;
        if (subst.angle == 90 || subst.angle == 270) {
          p2.y = p5.y - dist; // (p1.y+p5.y)/2;
          p3.y = p5.y - dist; // (p1.y+p5.y)/2;
        } else {
          p2.x = p5.x - dist; // (p1.x+p5.x)/2;
          p3.x = p5.x - dist; // (p1.x+p5.x)/2;
        }
        r.setPoint(2, p2);
        r.setPoint(3, p3);
        r.commitRoute();
      }
    }
  }
}
// end of SideTreeLayout

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
      initialAutoScale: go.Diagram.UniformToFill,
      layout: new SideTreeLayout({
        treeStyle: go.TreeStyle.LastParents,
        arrangement: go.TreeArrangement.Horizontal,
        // properties for most of the tree:
        angle: 90,
        layerSpacing: 35,
        // properties for the "last parents":
        alternateAngle: 90,
        alternateLayerSpacing: 35,
        alternateAlignment: go.TreeAlignment.Bus,
        alternateNodeSpacing: 20
      }),
      'undoManager.isEnabled': true
    });

     // Define colors based on categories
    const categoryColors: { [key: string]: string } = {
      'Azul': '#BBD6EE',    // Azul claro
      'Blanco': '#E1EFD8',      // Blanco
      'Rojo': '#FFB3B3',    // Rojo claro
      'Amarillo': '#FEE599'   // Amarillo claro
    };

    // Node template with TreeExpanderButton
    diagram.nodeTemplate = $(go.Node, 'Spot',
      { 
        isShadowed: true, shadowOffset: new go.Point(0, 2),
        mouseEnter: (e, node) => this.showChildIndicator(node as go.Node),
        mouseLeave: (e, node) => this.hideChildIndicator(node as go.Node)
      },
      $(go.Panel, 'Auto',
        $(go.Shape, 'RoundedRectangle', {
          strokeWidth: 0,
        },
      // Bind the fill color based on the category
      new go.Binding('fill', 'category', cat => categoryColors[cat] || '#BBD6EE')),
      $(go.TextBlock, { margin: 8, editable: true, maxSize: new go.Size(150, 150), minSize: new go.Size(150, 40), 
        textAlign: 'center' }, new go.Binding('text', 'name'))
      ),
      $(go.Shape, 'Circle', {
        name: 'CHILD_INDICATOR', width: 10, height: 10,
        fill: 'green', strokeWidth: 0,
        alignment: go.Spot.BottomCenter, alignmentFocus: go.Spot.Bottom,
        visible: false // Se muestra sólo al pasar el ratón si tiene hijos
      }),
      // TreeExpanderButton
      $('TreeExpanderButton', {
        _treeExpandedFigure: 'LineUp',
        _treeCollapsedFigure: 'LineDown',
        alignment: go.Spot.Bottom,
        opacity: 0
      }).bind('opacity', 'isSelected', (s: boolean) => (s ? 1 : 0))
    );

    // Define link template for orthogonal links with right angles
    diagram.linkTemplate = $(go.Link,
      {
        routing: go.Link.Orthogonal, // makes the links orthogonal with right angles
        corner: 10, // makes the corners rounded (adjust as needed)
        selectable: false
      },
      $(go.Shape, { strokeWidth: 2, stroke: '#424242' }) // style the link line
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
      { key: 1, name: 'Director/Gerente General', category: 'Amarillo' },

      // blanco
      { key: 2, parent: 1, name: 'Gerente Comercial', category: 'Blanco'},
      { key: 3, parent: 2, name: 'Asistente', category: 'Blanco', isAssistant: true },
      { key: 4, parent: 2, name: 'Analista de datos', category: 'Blanco' },
      { key: 5, parent: 2, name: 'Coord. de Venta de Zona 2', category: 'Blanco' },
      { key: 6, parent: 5, name: 'Gerente de CEDIS', category: 'Blanco' },
      { key: 7, parent: 6, name: 'Encargado Administrativo', category: 'Blanco' },
      { key: 8, parent: 6, name: 'Supervisor de Ventas', category: 'Blanco' },
      { key: 75, parent: 8, name: 'Vendedor al detalle', category: 'Blanco' },
      { key: 9, parent: 7, name: 'Mecanico', category: 'Blanco' },
      { key: 10, parent: 7, name: 'Almacenista', category: 'Blanco' },
      { key: 11, parent: 10, name: 'labores domesticas', category: 'Blanco' },
      { key: 12, parent: 2, name: 'Coordinador de SIC', category: 'Blanco' },
      { key: 13, parent: 12, name: 'Exhibidores', category: 'Blanco' },
      { key: 14, parent: 12, name: 'IMA', category: 'Blanco' },
      { key: 15, parent: 12, name: 'Monitoreo', category: 'Blanco' },
      { key: 16, parent: 12, name: 'Iniciativas Operacion', category: 'Blanco' },
      { key: 17, parent: 12, name: 'Instructor de venta', category: 'Blanco' },
      { key: 18, parent: 2, name: 'Encargado de capital humano', category: 'Blanco' },
      { key: 19, parent: 18, name: 'Encargado de reclutamiento', category: 'Blanco' },
      { key: 20, parent: 18, name: 'Encargado de Capacitacion', category: 'Blanco' },
          
      // azul
      { key: 21, parent: 1, name: 'Gerente de Compras, Rel. Comerciales, Operaciones y Logística', category: 'Azul' },
      { key: 22, parent: 21, name: 'Asistente', category: 'Azul', isAssistant: true },
      { key: 23, parent: 21, name: 'Coordinador de Servicios Administrativos a CEDIS (SAC)', category: 'Azul' },
      { key: 24, parent: 23, name: 'Asistente de Coordinador de SAC', category: 'Azul', isAssistant: true },
      { key: 25, parent: 23, name: 'SAC', category: 'Azul' },
      { key: 26, parent: 25, name: 'Compras', category: 'Azul' },
      { key: 27, parent: 25, name: 'Aux. Administrativo de SAC (Inventarios)', category: 'Azul' },
      { key: 28, parent: 25, name: 'Aux. Administrativo de SAC (Iniciativas)', category: 'Azul' },
      { key: 29, parent: 25, name: 'Aux. Administrativo de SAC (Operaciones)', category: 'Azul' },
      { key: 30, parent: 25, name: 'Capacccitador de administrativo de CEDIS', category: 'Azul' },
      { key: 31, parent: 25, name: 'Auditor interno Operativo de CEDIS', category: 'Azul' },
      { key: 32, parent: 25, name: 'Monitoreo Operaciones', category: 'Azul' },
      { key: 33, parent: 23, name: 'Gestor de cartera', category: 'Azul' },
      { key: 34, parent: 33, name: 'Aux. Administrativo (cartera)', category: 'Azul' },
      { key: 35, parent: 23, name: 'Coordinador Logística Kiosko', category: 'Azul' },
      { key: 36, parent: 35, name: 'Aux. Administrativo (Logística Kiosko)', category: 'Azul' },
          
      // rojo
      { key: 37, parent: 1, name: 'Gerente de Administración y Finanzas', category: 'Rojo' },
      { key: 38, parent: 37, name: 'Analista Financiero', category: 'Rojo' },
      { key: 39, parent: 38, name: 'Aux. Contable', category: 'Rojo' },
      { key: 40, parent: 37, name: 'Asistente', category: 'Rojo', isAssistant: true },
      { key: 41, parent: 37, name: 'Contador General', category: 'Rojo' },
      { key: 42, parent: 37, name: 'Coordinador de TI', category: 'Rojo' },
      { key: 43, parent: 42, name: 'Lider de proyecto', category: 'Rojo' },
      { key: 44, parent: 43, name: 'Programadores', category: 'Rojo' },
      { key: 45, parent: 44, name: 'Asistencia y soporte técnico', category: 'Rojo', isAssistant: true },
      { key: 46, parent: 41, name: 'Tesoreria', category: 'Rojo' },
      { key: 47, parent: 46, name: 'Aux. Tesorería & Comp. Pagos.', category: 'Rojo' },
      { key: 48, parent: 41, name: 'Delegado Contable', category: 'Rojo' },
      { key: 49, parent: 48, name: 'Aux. Delegado Contable', category: 'Rojo' },
      { key: 50, parent: 49, name: 'Aux. Contable', category: 'Rojo' },
      { key: 51, parent: 48, name: 'Aux. Conciliación', category: 'Rojo' },
      { key: 52, parent: 48, name: 'Encargado de Facturacion', category: 'Rojo' },
      { key: 53, parent: 41, name: 'Delegado Fiscal', category: 'Rojo' },
      { key: 54, parent: 53, name: 'Aux. Delegado Fiscal.', category: 'Rojo' },
      { key: 55, parent: 41, name: 'Encargado de Nominas y prestaciones', category: 'Rojo' },
      { key: 56, parent: 55, name: 'Aux. de Nominas y prestaciones.', category: 'Rojo' },
      { key: 57, parent: 55, name: 'Aux. costo Social', category: 'Rojo' },
      { key: 58, parent: 41, name: 'Gestor de cartera 2', category: 'Rojo' },
      { key: 59, parent: 58, name: 'Aux. administrativo de cartera', category: 'Rojo' },
          
      // amarilla
      { key: 60, parent: 1, name: 'Asistente Gerente General', category: 'Amarillo', isAssistant: true },
      { key: 61, parent: 1, name: 'Gerente de Transporte', category: 'Amarillo' },
      { key: 62, parent: 61, name: 'Mensajero', category: 'Amarillo' },
      { key: 63, parent: 61, name: 'Encargado de combustible', category: 'Amarillo' },
      { key: 64, parent: 61, name: 'Soldador', category: 'Amarillo' },
      { key: 65, parent: 61, name: 'Mecanico 2', category: 'Amarillo' },
      { key: 66, parent: 65, name: 'Aux. Mecanico', category: 'Amarillo' },
      { key: 67, parent: 61, name: 'Administrador de flotilla', category: 'Amarillo' },
      { key: 68, parent: 67, name: 'Aux. Administrativo', category: 'Amarillo' },
      { key: 69, parent: 67, name: 'Aux. Admin de flotilla', category: 'Amarillo' },
      { key: 70, parent: 67, name: 'compras foraneas', category: 'Amarillo' },
      { key: 71, parent: 61, name: 'Labores diversas', category: 'Amarillo' },
      { key: 72, parent: 60, name: 'Recepcion', category: 'Amarillo' },
      { key: 73, parent: 72, name: 'Vigilancia', category: 'Amarillo' },
      { key: 74, parent: 72, name: 'Aseo y Limpieza', category: 'Amarillo' },

    ]);

  }

}


 // ngOnInit() {
  //   // Cargar la lista de departamentos al inicializar el componente
  //   this.departmentDocumentService.getDepartments().subscribe((deparments) => {
  //     this.deparments = deparments;
  //   });
  // }

  // // Función para seleccionar un departamento y cargar el documento correspondiente
  // SelectDepartment(idDepartment: number) {
  //   console.log('Departamento seleccionado:', idDepartment);
  //   this.departmentDocumentService.getDocumentsbyDepartment(idDepartment).subscribe((document) => {
  //     console.log('Documento recibido:', document); // Esto debería imprimir la respuesta
  //     if (document && document[0]?.documentLinkRoute) { // Aquí se asume que documento es un array
  //       const unsafeUrl = `https://drive.google.com/file/d/${document[0].documentLinkRoute}/preview`;
  //       console.log('URL del documento:', unsafeUrl); // Agrega este log
  //       this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  //       this.message = ''; // Limpia el mensaje si hay documento
  //     } else {
  //       this.documentRoute = null; // Limpia el documento si no hay
  //       this.message = 'No existe documento para este departamento'; // Asigna el mensaje
  //     }
  //   });
  // }

  // // Función para ver el Organigrama General (documento con ID 3)
  // seeGeneralOrganizationChart() {
  //   this.http.get<any>('http://localhost:3000/document/3').subscribe(document => {
  //     console.log('Documento General recibido:', document); // Log para depurar
  //     if (document && document.documentLinkRoute) {
  //       const unsafeUrl = `https://drive.google.com/file/d/${document.documentLinkRoute}/preview`;
  //       this.documentRoute = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  //       this.message = ''; // Limpia el mensaje si se muestra el documento general
  //     } else {
  //       this.documentRoute = null; // Limpia el documento si no hay
  //       this.message = 'No existe documento general disponible'; // Mensaje en caso de error
  //     }
  //   });
  //}