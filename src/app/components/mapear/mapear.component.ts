import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PDFDocumentProxy } from 'pdfjs-dist';
import Konva from 'konva';


declare const pdfjsLib: any; // Agregar esta declaración


@Component({
  selector: 'app-mapear',
  templateUrl: './mapear.component.html',
  styleUrls: ['./mapear.component.css']
})
export class MapearComponent implements AfterViewInit {

  @ViewChild('container', {static: false}) containerRef!: ElementRef; // Asignar un valor inicial y utilizar {static: false}
  public mostrarRectangulo = false;

  ngAfterViewInit() {
    const container = this.containerRef.nativeElement;
    const url = 'assets/pdf/prueba.pdf'; // Ruta del archivo PDF

    // Carga el archivo PDF utilizando PDF.js
    const loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then((pdfDocument: PDFDocumentProxy) => {
      // Obtén la primera página del PDF
      const pageNumber = 1;
      pdfDocument.getPage(pageNumber).then((page) => {
        // Obtén las dimensiones del área de dibujo de la página
        const viewport = page.getViewport({ scale: 1 });

        // Crea un nuevo escenario de Konva en el contenedor
        const stage = new Konva.Stage({
          container: container,
          width: viewport.width,
          height: viewport.height
        });

        // Crea una nueva capa en el escenario
        const layer = new Konva.Layer();

        // Verifica si se debe mostrar el rectángulo
        if (this.mostrarRectangulo) {
          // Crea un nuevo rectángulo en la capa
          const rect = new Konva.Rect({
            x: 20,
            y: 20,
            width: 100,
            height: 50,
            fill: 'blue',
            draggable: true // Habilita la función de arrastrar y soltar en el rectángulo
          });

          // Añade un evento para escuchar el evento de cambio de posición del rectángulo
          rect.on('dragend', (event) => {
            const target = event.target;
            const x = target.x();
            const y = target.y();
            console.log(`Nuevas coordenadas: x=${x}, y=${y}`);
          });

          // Agrega el rectángulo a la capa
          layer.add(rect);
        }

        // Agrega la capa al escenario
        stage.add(layer);
      });
    });
  }

  agregarCajita() {
    const stage = Konva.stages[0]; // Obtén la referencia al escenario de Konva
    const layer = stage.getLayers()[0]; // Obtén la referencia a la capa del escenario

    // Crea un nuevo rectángulo en la capa
    const rect = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'blue',
      draggable: true
    });

    // Añade un evento para escuchar el evento de cambio de posición del rectángulo
    rect.on('dragend', (event) => {
      const target = event.target;
      const x = target.x();
      const y = target.y();
      console.log(`Nuevas coordenadas: x=${x}, y=${y}`);
    });

    // Agrega el rectángulo a la capa
    layer.add(rect);

    // Redibuja la capa para mostrar el nuevo rectángulo
    layer.draw();
  
  }

}
