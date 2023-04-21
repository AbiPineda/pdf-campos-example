import { Component } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent {
  mostrarInput: boolean = false;
  inputPosX: number = 0;
  inputPosY: number = 0;

  // Método para mostrar el input al hacer clic en el botón
  crearCajita() {
    this.mostrarInput = true;
  }

  onDrop(event: CdkDragDrop<any>) {
    // Obtener las coordenadas relativas del input dentro del contenedor de drop
    const containerRect = event.container.element.nativeElement.getBoundingClientRect();
    const inputRect = event.item.element.nativeElement.getBoundingClientRect();
    const inputRelativePosX = inputRect.left - containerRect.left;
    const inputRelativePosY = inputRect.top - containerRect.top;

    // Obtener las coordenadas del puntero del evento
    let pointerX, pointerY;
    if (event.event instanceof MouseEvent) {
      pointerX = event.event.clientX;
      pointerY = event.event.clientY;
    } else if (event.event instanceof TouchEvent) {
      pointerX = event.event.touches[0]?.clientX;
      pointerY = event.event.touches[0]?.clientY;
    }

    // Verificar si las variables están definidas antes de usarlas
    if (pointerX !== undefined && pointerY !== undefined) {
      // Actualizar las coordenadas en las variables del componente
      this.inputPosX = pointerX - inputRelativePosX;
      this.inputPosY = pointerY - inputRelativePosY;
    }
  }
}
