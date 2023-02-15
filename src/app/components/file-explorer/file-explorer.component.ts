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

  constructor(private fileSystemService: FileSystemService) {}

  fileSelection(){
    console.log(this.selectedFile);
    this.imageUrl = `directory://${this.selectedFile?.data?.name}`;
    console.log(this.imageUrl);
  }
  ngOnInit() {
    this.fileSystemService.getFiles().then((files) => {
      this.files = files;
    });
  }
}
