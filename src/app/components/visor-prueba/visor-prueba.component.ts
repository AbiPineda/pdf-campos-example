import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visor-prueba',
  templateUrl: './visor-prueba.component.html',
  styleUrls: ['./visor-prueba.component.css']
})
export class VisorPruebaComponent implements OnInit {
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
