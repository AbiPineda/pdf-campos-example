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
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DocumentsComponent,
    VisorComponent,
    DragDropComponent,
    MapearComponent
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
