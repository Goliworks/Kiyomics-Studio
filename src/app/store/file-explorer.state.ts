import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { FileSystemService } from '../services/file-system.service';
import { Tree } from 'primeng/tree';

export class UpdateTree {
  static readonly type = '[FileExplorer] UpdateTree';
  constructor() {}
}

export class AddFile {
  static readonly type = '[FileExplorer] AddFile';
  constructor(public file: string) {}
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
    // const state = ctx.getState();
    ctx.patchState({
      treeFiles: result,
    });
  }

  @Action(AddFile)
  async addFile(ctx: StateContext<TreeNode[]>, action: AddFile) {
    const result = await this.fileSystemService.addFile(action.file);
    // const state = ctx.getState();
    ctx.setState(result);
  }
}
