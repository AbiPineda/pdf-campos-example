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

  constructor(private sanitizer: DomSanitizer) { }

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
      fill: 'red' // Color de relleno del rectángulo
    });

    rect.draggable(true); // Habilitar la funcionalidad de arrastrar del rectángulo

    layer.add(rect); // Agregar el rectángulo a la capa



    // Agregar evento de soltar al contenedor del PDF
    const pdfContainer = document.getElementById('pdfContainer');
    if (pdfContainer) { // Verificar si pdfContainer no es null
      pdfContainer.addEventListener('drop', (event) => {
      event.preventDefault();
      const mouseX = event.clientX; // Obtener la posición del mouse en el eje x
      const mouseY = event.clientY; // Obtener la posición del mouse en el eje y

      // Obtener la posición relativa del rectángulo dentro del contenedor del PDF
      const rectX = rect.x() + stage.x();
      const rectY = rect.y() + stage.y();

      // Verificar si el rectángulo está dentro del área del PDF
      if (mouseX > rectX && mouseX < rectX + rect.width() && mouseY > rectY && mouseY < rectY + rect.height()) {
        // El rectángulo está dentro del área del PDF, realizar acciones necesarias
        console.log('Rectángulo soltado en el PDF');
      }
    });

    pdfContainer.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  }
}

}

