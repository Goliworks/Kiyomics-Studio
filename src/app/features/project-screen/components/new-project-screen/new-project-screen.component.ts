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
    format: new FormControl(''),
    width: new FormControl(0),
    height: new FormControl(0),
  });

  projectFormat = [
    { name: 'HD 1280 x 720', width: 1280, height: 720 },
    { name: 'Full HD 1920 x 1080', width: 1920, height: 1080 },
    { name: 'Custom', width: 0, height: 0 },
  ];
}
