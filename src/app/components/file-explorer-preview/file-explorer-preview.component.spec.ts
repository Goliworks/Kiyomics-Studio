import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerPreviewComponent } from './file-explorer-preview.component';

describe('FileExplorerPreviewComponent', () => {
  let component: FileExplorerPreviewComponent;
  let fixture: ComponentFixture<FileExplorerPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExplorerPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExplorerPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
