import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PDFDocument } from 'pdf-lib';
import Konva from 'konva';
import { fromEvent } from 'rxjs';


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

  @ViewChild('pdfContainer', { static: true }) pdfContainer!: ElementRef;

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

    //la parte comentareada permite redimencionar el tamaño de los rectangulos

    // let MAX_WIDTH = 500;

    //   let tr = new Konva.Transformer({
    //     boundBoxFunc: function (oldBoundBox, newBoundBox) {

    //       if (Math.abs(newBoundBox.width) > MAX_WIDTH) {
    //         return oldBoundBox;
    //       }

    //       return newBoundBox;
    //     },
    //   });
    //   tr.rotateEnabled(false);

    //   layer.add(tr);
    //   tr.nodes([rect]);

    this.stage.add(layer); // Agregar la capa al escenario de Konva
  }

  ngOnInit(): void {
    const pdfPath = 'assets/pdf/prueba.pdf';
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(pdfPath);
    this.initializeKonva();

    this.stage = new Konva.Stage({
      container: 'pdfContainer', // ID del contenedor HTML donde se renderizará el lienzo de Konva
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true // Habilitar la funcionalidad de arrastrar del lienzo
    });

    const layer = new Konva.Layer();
    this.stage.add(layer);
  }
  ngAfterViewInit() {
    this.pdfContainer.nativeElement.querySelector('.konvajs-content').id = 'myKonvaContainer';
  }

  private initializeKonva() {
    this.stage = new Konva.Stage({
      container: 'myKonvaContainer',
      width: this.pdfContainer.nativeElement.offsetWidth,
      height: this.pdfContainer.nativeElement.offsetHeight
    });
    const layer = new Konva.Layer();
    this.stage.add(layer);


     // Redimensionar el canvas de Konva cuando se cambia el tamaño del pdfContainer
     fromEvent(window, 'resize').subscribe(() => {
      this.stage.width(this.pdfContainer.nativeElement.offsetWidth);
      this.stage.height(this.pdfContainer.nativeElement.offsetHeight);
    });

  }

}
