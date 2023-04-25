import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.css']
})
export class KonvaComponent {
  @ViewChild('pdfIframe') pdfIframe!: ElementRef;

  ngAfterViewInit() {
    // Obtén la referencia al elemento del iframe
    const iframeElement = this.pdfIframe.nativeElement;

    // Crea una nueva capa de Konva
    const stage = new Konva.Stage({
      container: 'container', // Reemplaza 'container' con el ID o la referencia al contenedor de Konva en tu HTML
      width: iframeElement.offsetWidth,
      height: iframeElement.offsetHeight
    });

    const pdfLayer = new Konva.Layer(); // Capa para el PDF
    stage.add(pdfLayer);

    const rectLayer = new Konva.Layer(); // Capa para el rectángulo
    stage.add(rectLayer);

    // Crea tus objetos de Konva (por ejemplo, un rectángulo)
    const rect = new Konva.Rect({
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      fill: 'green',
      draggable: true, // Hacer el rectángulo arrastrable
      zIndex: 1
    });

    rect.on('dragend', (event) => {
      console.log(`Coordenadas del rectángulo: x=${event.target.x()} y=${event.target.y()}`);
      rectLayer.moveToTop(); // Mover la capa del rectángulo al tope después de soltarlo
      rectLayer.draw();
    });

    rectLayer.add(rect); // Agregar el rectángulo a su capa
    rectLayer.draw(); // Dibujar la capa del rectángulo

    
    // Coloca el iframe encima de la capa de Konva
    iframeElement.style.position = 'absolute';
    iframeElement.style.top = '0';
    iframeElement.style.left = '0';
    iframeElement.style.zIndex = '0';

  }

}
