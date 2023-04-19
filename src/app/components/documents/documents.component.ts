import { Component, OnInit } from '@angular/core';
declare const window: any;
const pdfjsLib = window['pdfjs-dist/build/pdf'];

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit{

  extractedText: string = ''; // Asigna un valor inicial a la variable para evitar el error

  constructor() { }

  async ngOnInit() {
    // Cargar el archivo PDF y extraer el contenido de texto
    const pdfUrl = '/assets/pdf/R30';
    console.log(pdfUrl);
    try {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent(); // Utiliza la interfaz TextContent proporcionada por pdfjs-dist
      this.extractedText = textContent.items.map((item: any) => item.str).join(' '); // Especificar el tipo de datos de item como any
    } catch (error) {
      console.error('Error al cargar el archivo PDF:', error);

    }
  }
}
