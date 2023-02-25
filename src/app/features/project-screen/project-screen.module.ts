import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectScreenComponent } from './components/project-screen/project-screen.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { NewProjectScreenComponent } from './components/new-project-screen/new-project-screen.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [ProjectScreenComponent, NewProjectScreenComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CarouselModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    InputNumberModule,
    RadioButtonModule,
  ],
  exports: [ProjectScreenComponent],
})
export class ProjectScreenModule {}
