import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectScreenComponent } from './components/project-screen/project-screen.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [ProjectScreenComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
    DialogModule,
  ],
  exports: [ProjectScreenComponent],
})
export class ProjectScreenModule {}
