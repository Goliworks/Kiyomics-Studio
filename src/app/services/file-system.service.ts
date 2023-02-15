import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri'
import {TreeNode} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() {}

  async getFiles(): Promise<TreeNode[]> {
    return new Promise((resolve, reject) => {
      invoke('get_files').then((s) => {
        resolve(<TreeNode[]>s);
      });
    });
  }
}
