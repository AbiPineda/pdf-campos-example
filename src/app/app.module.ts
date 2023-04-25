import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { VisorComponent } from './components/visor/visor.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MapearComponent } from './components/mapear/mapear.component';

import { VisorPruebaComponent } from './components/visor-prueba/visor-prueba.component';

import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,

    VisorComponent,

    MapearComponent,
    VisorPruebaComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
