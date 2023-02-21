import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './components/file-explorer/file-explorer.component';
import { FileComponent } from './components/file/file.component';
import { FileExplorerPreviewComponent } from './components/file-explorer-preview/file-explorer-preview.component';
import { NgxsModule } from '@ngxs/store';
import { FileExplorerState } from './store/file-explorer.state';
import { BrowserModule } from '@angular/platform-browser';
import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    FileExplorerComponent,
    FileComponent,
    FileExplorerPreviewComponent,
  ],
  imports: [
    CommonModule,
    NgxsModule.forFeature([FileExplorerState]),
    BrowserModule,
    TreeTableModule,
  ],
  exports: [FileExplorerComponent],
})
export class FileExplorerModule {}
