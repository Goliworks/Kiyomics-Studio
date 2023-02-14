import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri'

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() {}

  async getFiles() {
    invoke('get_files').then((s) => {
      console.log(s);
    });
  }
}
