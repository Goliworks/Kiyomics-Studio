import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FileComponent } from './components/file/file.component';

// PrimeNG Modules
import { TreeTableModule } from 'primeng/treetable';
import { FileExplorerPreviewComponent } from './components/file-explorer-preview/file-explorer-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    FileExplorerComponent,
    FileComponent,
    FileExplorerPreviewComponent
  ],
  imports: [
    BrowserModule,
    TreeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
