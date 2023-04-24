import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // Importar desde @angular/platform-browser
import { PDFDocument } from 'pdf-lib';
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
  }

  updatePdfUrl(url: string) {
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async habilitarEdicion() {
    try {

      // Cargar el archivo PDF desde una URL o un archivo local
      const pdfBytes = await fetch('assets/pdf/prueba.pdf').then(res => res.arrayBuffer());

      // Crear un documento PDF a partir de los bytes cargados
      const pdfDoc = await PDFDocument.load(pdfBytes);

       // Add a blank page to the document
       const page = pdfDoc.getPage(0);

      // Obtener el formulario del documento
      const form = pdfDoc.getForm();


      const nameField = form.createTextField('textName');
      nameField.setText('');
      nameField.addToPage(page, { x: 120, y: 760, width: 200, height: 15 });


      // Guardar el documento modificado como bytes
      const pdfBytesModificado = await pdfDoc.save();

      // Crear un objeto Blob a partir de los bytes del PDF modificado
      const pdfBlob = new Blob([pdfBytesModificado], { type: 'application/pdf' });

      // Crear una URL segura para el Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

     // Llamar al método updatePdfUrl() del componente VisorComponent para actualizar la URL del PDF en el iframe
     this.updatePdfUrl(pdfUrl);

    } catch (error) {
      console.error('Error al habilitar la edición del PDF:', error);
    }
  }
}
