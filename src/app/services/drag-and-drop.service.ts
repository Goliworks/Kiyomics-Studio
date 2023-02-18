import { Injectable } from '@angular/core';
import {listen} from "@tauri-apps/api/event";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {

  dragZone = new BehaviorSubject(false);

  constructor() {
    this.initTauriFileDrop();
    this.initTauriFileDropCancelled();
  }

  private initTauriFileDrop(){
    listen('tauri://file-drop', (event) => {
      console.log(event);
      const file = (<any>event).payload[0] as string;
      // this.addFile(file);
      this.dragZone.next(false);
    }).finally();
  }

  private initTauriFileDropCancelled(){
    listen("tauri://file-drop-cancelled", event => {
      this.dragZone.next(false);
    }).finally();
  }
}
