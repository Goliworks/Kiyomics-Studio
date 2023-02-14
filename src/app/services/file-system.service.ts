import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri'

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor() {}

  async getFiles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      invoke('get_files').then((s) => {
        resolve(<string[]>s);
      });
    });
  }
}
