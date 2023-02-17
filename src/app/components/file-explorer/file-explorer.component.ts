import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TreeNode} from "primeng/api";
import {FileSystemService} from "../../services/file-system.service";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {FileExplorerState, UpdateTree} from "../../store/file-explorer.state";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  files: TreeNode[] = [];
  @Select(FileExplorerState) files$: Observable<TreeNode[]> | undefined;
  selectedFile: TreeNode | undefined;

  imageUrl = ''

  constructor(public fileSystemService: FileSystemService, private changeDetectorRef: ChangeDetectorRef, private store: Store) {}

  dragZone = false;

  fileSelection(){
    console.log(this.selectedFile);
    this.imageUrl = `directory://${this.selectedFile?.data?.name}`;
    console.log(this.imageUrl);
  }

  dragEnter() {
    console.log("enter");
    this.fileSystemService.dragZone.next(true);
  }

  dragLeave() {
    console.log("leave");
    this.fileSystemService.dragZone.next(false);
  }

  ngOnInit() {
    this.store.dispatch(new UpdateTree());

    this.files$?.subscribe(tree => {
      this.files = tree.map(item =>  ({...item})); // copy items
    });

    this.fileSystemService.dragZone.subscribe((v) => {
      this.dragZone = v;
      this.changeDetectorRef.detectChanges();
    });
  }
}
