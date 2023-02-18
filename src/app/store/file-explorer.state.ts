import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TreeNode } from 'primeng/api';
import { FileSystemService } from '../services/file-system.service';

export class UpdateTree {
  static readonly type = '[FileExplorer] UpdateTree';
  constructor() {}
}

export class AddFile {
  static readonly type = '[FileExplorer] AddFile';
  constructor(public file: string) {}
}

@State<TreeNode[]>({
  name: 'fileExplorer',
  defaults: [],
})
@Injectable()
export class FileExplorerState {
  constructor(private fileSystemService: FileSystemService) {}
  @Action(UpdateTree)
  async updateTree(ctx: StateContext<TreeNode[]>, action: UpdateTree) {
    const result = await this.fileSystemService.getFiles();
    // const state = ctx.getState();
    ctx.setState(result);
  }

  @Action(AddFile)
  async addFile(ctx: StateContext<TreeNode[]>, action: AddFile) {
    const result = await this.fileSystemService.addFile(action.file);
    // const state = ctx.getState();
    ctx.setState(result);
  }
}