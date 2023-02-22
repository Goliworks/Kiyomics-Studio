import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FileExplorerModule } from './features/file-explorer/file-explorer.module';
import { NgxsModule } from '@ngxs/store';
import { CoreModule } from './core/core.module';
import { ProjectScreenModule } from './features/project-screen/project-screen.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([], {
      developmentMode: true,
    }),
    CoreModule,
    FileExplorerModule,
    ProjectScreenModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
