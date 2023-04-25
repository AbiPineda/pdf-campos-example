import { Injectable } from '@angular/core';
declare var Konva: any; // Importar la biblioteca Konva

@Injectable({
  providedIn: 'root'
})
export class KonvaService {

  Konva: any; // Variable para acceder a la biblioteca Konva

  constructor() {
    this.Konva = Konva; // Inicializar la variable de la biblioteca Konva
  }

  initKonva(): Promise<void> {
    return new Promise<void>((resolve) => {
      // Cargar la biblioteca Konva
      const script = document.createElement('script');
      script.onload = () => {
        resolve();
      };
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/konva/3.2.5/konva.min.js'; // Coloca aquí la URL correcta de la biblioteca Konva
      document.head.appendChild(script);
    });
  }
}
