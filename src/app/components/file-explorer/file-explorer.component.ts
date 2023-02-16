import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";
import {FileSystemService} from "../../services/file-system.service";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  files: TreeNode[] = [];
  selectedFile: TreeNode | undefined;

  imageUrl = ''

  dragZone = false;

  constructor(private fileSystemService: FileSystemService) {}

  fileSelection(){
    console.log(this.selectedFile);
    this.imageUrl = `directory://${this.selectedFile?.data?.name}`;
    console.log(this.imageUrl);
  }

  dragEnter() {
    console.log("enter");
    this.dragZone = true;
  }

  dragLeave() {
    console.log("leave");
    this.dragZone = false;
  }

  ngOnInit() {
    this.fileSystemService.getFiles().then((files) => {
      this.files = files;
    });
  }
}
