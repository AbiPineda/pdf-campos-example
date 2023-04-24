import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; // Importar desde @angular/platform-browser

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
}
