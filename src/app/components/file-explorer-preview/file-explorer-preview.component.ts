import {Component, Input} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-file-explorer-preview',
  templateUrl: './file-explorer-preview.component.html',
  styleUrls: ['./file-explorer-preview.component.scss']
})
export class FileExplorerPreviewComponent {

  @Input() image: string = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
