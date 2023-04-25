import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DocumentsComponent } from './components/documents/documents.component';
import { VisorComponent } from './components/visor/visor.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './components/drag-drop/drag-drop.component';
import { MapearComponent } from './components/mapear/mapear.component';

import { VisorPruebaComponent } from './components/visor-prueba/visor-prueba.component';


import { HttpClientModule } from '@angular/common/http';
import { KonvaComponent } from './components/konva/konva.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    VisorComponent,
    DragDropComponent,
    MapearComponent,
    VisorPruebaComponent,
    KonvaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    PdfViewerModule,
    DragDropModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
