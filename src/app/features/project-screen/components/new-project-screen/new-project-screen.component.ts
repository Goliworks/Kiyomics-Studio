import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { invoke } from '@tauri-apps/api/tauri';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-new-project-screen',
  templateUrl: './new-project-screen.component.html',
  styleUrls: ['./new-project-screen.component.scss'],
})
export class NewProjectScreenComponent implements OnInit {
  @Output() backEvent = new EventEmitter();
  projectForm = new FormGroup({
    name: new FormControl(''),
    location: new FormControl(''),
    format: new FormControl({}),
    width: new FormControl(),
    height: new FormControl(),
  });

  projectFormat: ProjectFormat[] = [
    { name: 'HD', key: 'hd', width: 1280, height: 720 },
    { name: 'Full HD', key: 'full-hd', width: 1920, height: 1080 },
    { name: 'Custom', key: 'custom', width: 0, height: 0 },
  ];

  changeFormat(e: ChangeFormatEvent) {
    this.projectForm.get('width')?.patchValue(e.value.width);
    this.projectForm.get('height')?.patchValue(e.value.height);
  }

  changeSize() {
    this.projectForm.get('format')?.patchValue(this.projectFormat[2]); // Change format field to "Custom".
  }

  createProject() {
    console.log('Create project', this.projectForm.value); // Test.
  }

  private getDocumentsPath() {
    invoke('get_documents_path').then(path => {
      this.projectForm.get('location')?.patchValue(<string>path);
    });
  }

  ngOnInit() {
    this.projectForm.get('format')?.patchValue(this.projectFormat[0]);
    this.changeFormat({ originalEvent: null, value: this.projectFormat[0] });
    this.getDocumentsPath();
  }
}

interface ProjectFormat {
  name: string;
  key: string;
  width: number;
  height: number;
}

interface ChangeFormatEvent {
  originalEvent: Event | null;
  value: ProjectFormat;
}
