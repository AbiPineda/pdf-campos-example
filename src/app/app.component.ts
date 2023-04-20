import { Component } from '@angular/core';
import { PDFDocument, StandardFonts } from 'pdf-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre: string = '';

  async habilitarEdicion() {
    try {
      
      // Cargar el archivo PDF desde una URL o un archivo local
      const pdfBytes = await fetch('assets/pdf/prueba.pdf').then(res => res.arrayBuffer());

      // Crear un documento PDF a partir de los bytes cargados
      const pdfDoc = await PDFDocument.load(pdfBytes);

       // Add a blank page to the document
      const page = pdfDoc.addPage([550, 150]);

      // Obtener el formulario del documento
      const form = pdfDoc.getForm();


      const nameField = form.createTextField('favorite.superhero');
      nameField.setText('One Punch Man');
      nameField.addToPage(page, { x: 55, y: 80 });


      // Guardar el documento modificado como bytes
      const pdfBytesModificado = await pdfDoc.save();

      // Crear un objeto Blob a partir de los bytes del PDF modificado
      const pdfBlob = new Blob([pdfBytesModificado], { type: 'application/pdf' });

      // Crear una URL segura para el Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Abrir una nueva ventana con el PDF modificado
      window.open(pdfUrl, '_blank');

    } catch (error) {
      console.error('Error al habilitar la edición del PDF:', error);
    }
  }
}
