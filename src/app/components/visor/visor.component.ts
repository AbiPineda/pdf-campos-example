import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDFDocument } from 'pdf-lib';
import Konva from 'konva';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css'],
})

export class VisorComponent implements OnInit {
  pdfUrl: any;
  rects: Konva.Rect[] = []; // Lista de rectángulos
  stage!: Konva.Stage; // Referencia al escenario de Konva
  rectX: number = 0;
  rectY: number = 0;
  lastRectPosition: { x: number; y: number } = { x: 0, y: 0 }; // Última posición donde se creó un rectángulo
  parsedData: any;


  constructor(private sanitizer: DomSanitizer) {}

  onButtonPressed(buttonIndex: number): void {
    let x, y;
    let coordenadas =  this.parsedData[buttonIndex];
     console.log('algo ', coordenadas)


    const rect = new Konva.Rect({
      x: coordenadas.x, // Usar la posición x guardada
      y: coordenadas.y, // Usar la posición y guardada
      width: 200, // Ancho del rectángulo
      height: 20, // Altura del rectángulo
      fill: '#D2D0D0', // Color de relleno del rectángulo
      visible: true, // Establecer visible como true para mostrar el rectángulo
    });

    rect.draggable(true); // Habilitar la funcionalidad de arrastrar del rectángulo

    rect.on('dragend', (event) => {
      this.lastRectPosition = { x: rect.x(), y: rect.y() }; // Guardar la nueva posición como la última posición
      localStorage.setItem('lastRectPosition', JSON.stringify(this.lastRectPosition)); // Guardar la última posición en localStorage
      console.log(`Nuevas coordenadas: x=${this.lastRectPosition.x}, y=${this.lastRectPosition.y}`);

    });

    this.rects.push(rect); // Agregar el rectángulo a la lista de rectángulos
    const layer = new Konva.Layer();
    layer.add(rect); // Agregar el rectángulo a la capa de Konva

    //la parte comentareada permite redimencionar el tamaño de los rectangulos

    let MAX_WIDTH = 500;

      let tr = new Konva.Transformer({
        boundBoxFunc: function (oldBoundBox, newBoundBox) {

          if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
            return oldBoundBox;
          }

          return newBoundBox;
        },
      });
      tr.rotateEnabled(false);

      layer.add(tr);
      tr.nodes([rect]);


    this.stage.add(layer); // Agregar la capa al escenario de Konva

  }

  crearCuadrito(buttonIndex: number): void {
    let coordenadas =  this.parsedData[buttonIndex];
    if(coordenadas === null) {
      coordenadas = {x:20, y:20};
    }

    const rect = new Konva.Rect({
      x: coordenadas.x, // Usar la posición x guardada
      y: coordenadas.y, // Usar la posición y guardada
      width: 200, // Ancho del rectángulo
      height: 20, // Altura del rectángulo
      fill: '#D2D0D0', // Color de relleno del rectángulo
      visible: true, // Establecer visible como true para mostrar el rectángulo
    });

    rect.draggable(true); // Habilitar la funcionalidad de arrastrar del rectángulo

    rect.on('dragend', (event) => {
      // this.lastRectPosition = { x: rect.x(), y: rect.y() }; // Guardar la nueva posición como la última posición
      this.parsedData[buttonIndex] = {x: rect.x(), y: rect.y()};
      let jsonData = JSON.stringify(this.parsedData);
      localStorage.setItem("data",jsonData);
      console.log(`Nuevas coordenadas: x=${this.lastRectPosition.x}, y=${this.lastRectPosition.y}`);

    });

    this.rects.push(rect); // Agregar el rectángulo a la lista de rectángulos
    const layer = new Konva.Layer();
    layer.add(rect);
    this.stage.add(layer);
  }
  ngOnInit(): void {
    const pdfPath = 'assets/pdf/prueba.pdf';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);

    this.stage = new Konva.Stage({
      container: 'pdfContainer', // ID del contenedor HTML donde se renderizará el lienzo de Konva
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true, // Habilitar la funcionalidad de arrastrar del lienzo
    });

    const layer = new Konva.Layer();
    this.stage.add(layer);

    const storedData = localStorage.getItem("data");

    if (storedData) {
      this.parsedData = JSON.parse(storedData);
      console.log(this.parsedData);
    }

    this.cargarPDF(pdfPath);
  }

  async cargarPDF(pdfPath: string) {
    const pdfBytes = await fetch(pdfPath).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    console.log(`El archivo PDF tiene ${pageCount} páginas.`);
  }
}
