import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileExplorerModule } from './features/file-explorer/file-explorer.module';
import { NgxsModule } from '@ngxs/store';
import { FileExplorerState } from './features/file-explorer/store/file-explorer.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: true,
    }),
    FileExplorerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
