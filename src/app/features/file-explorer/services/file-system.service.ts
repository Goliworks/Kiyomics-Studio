import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { TreeNode } from 'primeng/api';
import { listen } from '@tauri-apps/api/event';
import { BehaviorSubject, Subject } from 'rxjs';
import { FileExplorerModule } from '../file-explorer.module';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  async getFiles(path = ''): Promise<TreeNode[]> {
    return new Promise((resolve, reject) => {
      invoke('get_files', { path }).then(files => {
        resolve(<TreeNode[]>files);
      });
    });
  }

  async addFile(file: string): Promise<TreeNode[]> {
    return new Promise(resolve => {
      invoke('add_file', { file }).then(files => {
        console.log('File added');
        resolve(<TreeNode[]>files);
      });
    });
  }
}
