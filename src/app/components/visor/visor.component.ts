import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDFDocument } from 'pdf-lib';
import Konva from 'konva';


@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.css']
})
export class VisorComponent implements OnInit {
  pdfUrl: any;
  rects: Konva.Rect[] = []; // Lista de rectángulos
  stage!: Konva.Stage; // Referencia al escenario de Konva
  rectX: number = 0;
  rectY: number = 0;
  constructor(private sanitizer: DomSanitizer) {
  }

  onButtonPressed(): void {
    const rect = new Konva.Rect({
      x: 100, // Posición en el eje x
      y: 100, // Posición en el eje y
      width: 200, // Ancho del rectángulo
      height: 20, // Altura del rectángulo
      fill: '#D2D0D0', // Color de relleno del rectángulo
      visible: true // Establecer visible como true para mostrar el rectángulo
    });

    rect.draggable(true); // Habilitar la funcionalidad de arrastrar del rectángulo

    rect.on('dragend', (event) => {
      this.rectX = rect.x(); // Obtener la posición x del rectángulo después de soltarlo
      this.rectY = rect.y(); // Obtener la posición y del rectángulo después de soltarlo
      console.log(`Nuevas coordenadas: x=${this.rectX}, y=${this.rectY}`);
    });

    this.rects.push(rect); // Agregar el rectángulo a la lista de rectángulos
    const layer = new Konva.Layer();
    layer.add(rect); // Agregar el rectángulo a la capa de Konva
    this.stage.add(layer); // Agregar la capa al escenario de Konva
  }

  ngOnInit(): void {
    const pdfPath = 'assets/pdf/prueba.pdf';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);

    this.stage = new Konva.Stage({
      container: 'pdfContainer', // ID del contenedor HTML donde se renderizará el lienzo de Konva
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true // Habilitar la funcionalidad de arrastrar del lienzo
    });

    const layer = new Konva.Layer();
    this.stage.add(layer);
  }
}
