import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { FileSystemService } from '../../services/file-system.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  ChangeDir,
  FileExplorerState,
  UpdateTree,
} from '../../store/file-explorer.state';
import { DragAndDropService } from '../../../../core/services/drag-and-drop.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent implements OnInit {
  files: TreeNode[] = [];
  @Select(FileExplorerState.treeFiles) files$:
    | Observable<TreeNode[]>
    | undefined;
  selectedFile: TreeNode | undefined;

  imageUrl = '';

  fileIcons: { [key: string]: string } = {
    FOLDER: 'pi-folder',
    JPG: 'pi-image',
    JPEG: 'pi-image',
    PNG: 'pi-image png-color',
    GIF: 'pi-images',
  };

  constructor(
    private fileSystemService: FileSystemService,
    public dranAndDropService: DragAndDropService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {}

  dragZone = false;

  fileSelection() {
    console.log(this.selectedFile);
    if (this.selectedFile?.data.file_type !== 'FOLDER') {
      const file = this.selectedFile?.data?.name.replace(' ', '&spc;'); // Replace spaces with custom code. (%20 don't works).
      this.imageUrl = `directory://${file}`;
      console.log(this.imageUrl);
    } else {
      this.imageUrl = '';
      this.store.dispatch(new ChangeDir(this.selectedFile?.data?.name));
    }
  }

  dragEnter() {
    console.log('enter');
    this.dranAndDropService.dragZone.next(true);
  }

  dragLeave() {
    console.log('leave');
    this.dranAndDropService.dragZone.next(false);
  }

  ngOnInit() {
    this.store.dispatch(new UpdateTree());

    this.files$?.subscribe(tree => {
      this.files = tree.map(item => ({ ...item })); // copy items
    });

    this.dranAndDropService.dragZone.subscribe(v => {
      this.dragZone = v;
      this.changeDetectorRef.detectChanges();
    });
  }
}
