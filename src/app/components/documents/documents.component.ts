import { Component, OnInit } from '@angular/core';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';



@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {
  async createPDF() {
    // Crear un nuevo documento PDF vacío
    const pdfDoc = await PDFDocument.create()

    // Add a blank page to the document
    const page = pdfDoc.addPage([550, 750])

    // Get the form so we can add fields to it
    const form = pdfDoc.getForm()

    // Add the superhero text field and description
    page.drawText('Enter your favorite superhero:', { x: 50, y: 700, size: 20 })

    const superheroField = form.createTextField('favorite.superhero')
      superheroField.setText('One Punch Man')
      superheroField.addToPage(page, { x: 55, y: 640 })

      // Add the rocket radio group, labels, and description
      page.drawText('Select your favorite rocket:', { x: 50, y: 600, size: 20 })

      page.drawText('Falcon Heavy', { x: 120, y: 560, size: 18 })
      page.drawText('Saturn IV', { x: 120, y: 500, size: 18 })
      page.drawText('Delta IV Heavy', { x: 340, y: 560, size: 18 })
      page.drawText('Space Launch System', { x: 340, y: 500, size: 18 })

      const rocketField = form.createRadioGroup('favorite.rocket')
      rocketField.addOptionToPage('Falcon Heavy', page, { x: 55, y: 540 })
      rocketField.addOptionToPage('Saturn IV', page, { x: 55, y: 480 })
      rocketField.addOptionToPage('Delta IV Heavy', page, { x: 275, y: 540 })
      rocketField.addOptionToPage('Space Launch System', page, { x: 275, y: 480 })
      rocketField.select('Saturn IV')

      // Add the gundam check boxes, labels, and description
      page.drawText('Select your favorite gundams:', { x: 50, y: 440, size: 20 })

      page.drawText('Exia', { x: 120, y: 400, size: 18 })
      page.drawText('Kyrios', { x: 120, y: 340, size: 18 })
      page.drawText('Virtue', { x: 340, y: 400, size: 18 })
      page.drawText('Dynames', { x: 340, y: 340, size: 18 })

      const exiaField = form.createCheckBox('gundam.exia')
      const kyriosField = form.createCheckBox('gundam.kyrios')
      const virtueField = form.createCheckBox('gundam.virtue')
      const dynamesField = form.createCheckBox('gundam.dynames')

      exiaField.addToPage(page, { x: 55, y: 380 })
      kyriosField.addToPage(page, { x: 55, y: 320 })
      virtueField.addToPage(page, { x: 275, y: 380 })
      dynamesField.addToPage(page, { x: 275, y: 320 })

      exiaField.check()
      dynamesField.check()

      // Add the planet dropdown and description
      page.drawText('Select your favorite planet*:', { x: 50, y: 280, size: 20 })

      const planetsField = form.createDropdown('favorite.planet')
      planetsField.addOptions(['Venus', 'Earth', 'Mars', 'Pluto'])
      planetsField.select('Pluto')
      planetsField.addToPage(page, { x: 55, y: 220 })

      // Add the person option list and description
      page.drawText('Select your favorite person:', { x: 50, y: 180, size: 18 })

      const personField = form.createOptionList('favorite.person')
      personField.addOptions([
        'Julius Caesar',
        'Ada Lovelace',
        'Cleopatra',
        'Aaron Burr',
        'Mark Antony',
      ])
      personField.select('Ada Lovelace')
      personField.addToPage(page, { x: 55, y: 70 })

      // Just saying...
      page.drawText(`* Pluto should be a planet too!`, { x: 15, y: 15, size: 15 })

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

			// Crear un blob desde el ArrayBuffer
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Descargar el PDF en el navegador
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'ejemplo.pdf';
      downloadLink.click();

  }


  async modifyPdf(){
    try {
    const url = 'http://localhost:4200/assets/pdf/prueba.pdf';

    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      // Load a PDFDocument from the existing PDF bytes
      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      // Embed the Helvetica font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      // Get the first page of the document
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      // Get the width and height of the first page
      const { width, height } = firstPage.getSize()

      //creamos formulario
      const form = pdfDoc.getForm()

      // firstPage.drawText('Enter your favorite superhero:', { x: 10, y: 100, size: 20 })

      
      const superheroField = form.createTextField('favorite.superhero')
        superheroField.addToPage(firstPage, { x: 120, y: 760, width: 100, height: 10  })



      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()

      // Crear un blob desde el ArrayBuffer
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

      // Descargar el PDF en el navegador
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(pdfBlob);
      downloadLink.download = 'ejemplo.pdf';
      downloadLink.click();
    } catch (error) {
      console.error('Error al obtener el archivo PDF:', error);
    }

  }
}
