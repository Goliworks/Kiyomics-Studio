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

  constructor(private fileSystemService: FileSystemService) {
  }

  ngOnInit() {
    this.fileSystemService.getFiles().then((files) => {
      this.files = files;
    });
  }

}
