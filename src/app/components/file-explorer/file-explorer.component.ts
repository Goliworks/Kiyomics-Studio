import { Component, OnInit } from '@angular/core';
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit {

  files: TreeNode[] = [];

  ngOnInit() {
    this.files = [{
      data: {
        name: "My file.png",
        dimensions: "800x600",
        type: "PNG",
      }
    },
    {
      data: {
        name: "another file.jpg",
        dimensions: "1200x900",
        type: "JPG",
      }
    },]
  }

}
