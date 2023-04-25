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
  showRect = false;

  constructor(private sanitizer: DomSanitizer) {
    this.showRect = false;
  }
  onButtonPressed(): void {
    console.log('entre')
    this.showRect = true; // Cambiar valor de showRect a true
    this.ngOnInit(); // Llamar a ngOnInit() para actualizar la visibilidad del rectángulo
    console.log('sali')
  }
  ngOnInit(): void {
    const pdfPath = 'assets/pdf/prueba.pdf';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);

    const stage = new Konva.Stage({
      container: 'pdfContainer', // ID del contenedor HTML donde se renderizará el lienzo de Konva
      width: window.innerWidth,
      height: window.innerHeight
    });

    const layer = new Konva.Layer();
    stage.add(layer);

    const rect = new Konva.Rect({
      x: 100, // Posición en el eje x
      y: 100, // Posición en el eje y
      width: 100, // Ancho del rectángulo
      height: 100, // Altura del rectángulo
      fill: 'red', // Color de relleno del rectángulo
      visible: this.showRect
    });

    rect.draggable(true); // Habilitar la funcionalidad de arrastrar del rectángulo

    layer.add(rect); // Agregar el rectángulo a la capa

    rect.on('dragend', (event) => {
      const rectX = rect.x(); // Obtener la posición x del rectángulo después de soltarlo
      const rectY = rect.y(); // Obtener la posición y del rectángulo después de soltarlo
      console.log(`Nuevas coordenadas: x=${rectX}, y=${rectY}`);
    });



  }
}



