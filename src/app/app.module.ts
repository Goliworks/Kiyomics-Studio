import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';

@NgModule({
  declarations: [
    AppComponent,
    FileExplorerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
