import { Component } from '@angular/core';
import { PDFDocument, PDFPage } from 'pdf-lib';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  async abrirPDF() {
   // Obtener el archivo PDF desde la carpeta "assets"
   const pdfBytes = await fetch('/assets/pdf/prueba.pdf').then(res => res.arrayBuffer());

   // Abrir el archivo PDF en una nueva pestaña del navegador
   const pdfDataUrl = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
   window.open(pdfDataUrl, '_blank');
  }
}
