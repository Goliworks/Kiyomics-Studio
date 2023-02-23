import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-project-screen',
  templateUrl: './new-project-screen.component.html',
  styleUrls: ['./new-project-screen.component.scss'],
})
export class NewProjectScreenComponent {
  projectForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    format: new FormControl({}),
    width: new FormControl(),
    height: new FormControl(),
  });

  projectFormat: ProjectFormat[] = [
    { name: 'HD 1280 x 720', width: 1280, height: 720 },
    { name: 'Full HD 1920 x 1080', width: 1920, height: 1080 },
    { name: 'Custom', width: 0, height: 0 },
  ];

  changeFormat(e: ChangeFormatEvent) {
    this.projectForm.get('width')?.patchValue(e.value.width);
    this.projectForm.get('height')?.patchValue(e.value.height);
  }

  changeSize() {
    this.projectForm.get('format')?.patchValue(this.projectFormat[2]); // Change format field to "Custom".
  }
}

interface ProjectFormat {
  name: string;
  width: number;
  height: number;
}

interface ChangeFormatEvent {
  originalEvent: Event;
  value: ProjectFormat;
}
