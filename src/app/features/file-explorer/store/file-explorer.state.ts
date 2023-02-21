import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { FileSystemService } from '../services/file-system.service';
import { Tree } from 'primeng/tree';

export class UpdateTree {
  static readonly type = '[FileExplorer] UpdateTree';
}

export class AddFile {
  static readonly type = '[FileExplorer] AddFile';
  constructor(public file: string) {}
}

export class ChangeDir {
  static readonly type = '[FileExplorer] ChangeDir';
  constructor(public directory: string) {}
}

export interface FileExplorerModel {
  currentDir: string;
  treeFiles: TreeNode[];
}

@State<FileExplorerModel>({
  name: 'fileExplorer',
  defaults: {
    currentDir: '',
    treeFiles: [],
  },
})
@Injectable()
export class FileExplorerState {
  constructor(private fileSystemService: FileSystemService) {}

  @Selector()
  static treeFiles(state: FileExplorerModel) {
    return state.treeFiles;
  }

  @Action(UpdateTree)
  async updateTree(ctx: StateContext<FileExplorerModel>, action: UpdateTree) {
    const result = await this.fileSystemService.getFiles();
    ctx.patchState({
      treeFiles: result,
    });
  }

  @Action(AddFile)
  async addFile(ctx: StateContext<FileExplorerModel>, action: AddFile) {
    const result = await this.fileSystemService.addFile(action.file);
    ctx.patchState({
      treeFiles: result,
    });
  }

  @Action(ChangeDir)
  async changeDir(ctx: StateContext<FileExplorerModel>, action: ChangeDir) {
    const currentDir = ctx.getState().currentDir;
    const newDir = `${currentDir}/${action.directory}`;
    const result = await this.fileSystemService.getFiles(newDir);
    ctx.patchState({
      currentDir: newDir,
      treeFiles: result,
    });
  }
}
