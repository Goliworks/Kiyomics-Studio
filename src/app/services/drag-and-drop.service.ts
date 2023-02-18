import { Injectable } from '@angular/core';
import {listen} from "@tauri-apps/api/event";
import {BehaviorSubject} from "rxjs";
import {Store} from "@ngxs/store";
import {AddFile} from "../store/file-explorer.state";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  dragZone = new BehaviorSubject(false);

  constructor(private store: Store) {
    this.initTauriFileDrop();
    this.initTauriFileDropCancelled();
  }

  private initTauriFileDrop(){
    listen('tauri://file-drop', (event) => {
      console.log(event);
      const file = (<any>event).payload[0] as string;
      // this.addFile(file);
      this.store.dispatch(new AddFile(file));
      this.dragZone.next(false);
    }).finally();
  }

  private initTauriFileDropCancelled(){
    listen("tauri://file-drop-cancelled", event => {
      this.dragZone.next(false);
    }).finally();
  }
}
