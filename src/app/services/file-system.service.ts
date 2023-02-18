import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri'
import {TreeNode} from "primeng/api";
import { listen } from '@tauri-apps/api/event'
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  async getFiles(): Promise<TreeNode[]> {
    return new Promise((resolve, reject) => {
      invoke('get_files').then((s) => {
        resolve(<TreeNode[]>s);
      });
    });
  }

  addFile(file: string) {
    invoke('add_file', { file }).then(() => {
      console.log('File added')
    });
  }
}
