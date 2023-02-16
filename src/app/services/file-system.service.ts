import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri'
import {TreeNode} from "primeng/api";
import { listen } from '@tauri-apps/api/event'
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  dragZone = new BehaviorSubject(false);

  constructor() {
    listen('tauri://file-drop', event => {
      this.dragZone.next(false);
    }).finally();
    listen("tauri://file-drop-cancelled", event => {
      this.dragZone.next(false);
    }).finally();
  }

  async getFiles(): Promise<TreeNode[]> {
    return new Promise((resolve, reject) => {
      invoke('get_files').then((s) => {
        resolve(<TreeNode[]>s);
      });
    });
  }
}
