import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './material/angularmaterial.module';

import { NotFoundComponent } from './not-found/not-found.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { ContactComponent } from './contact/contact.component';
// import { ProjectComponent } from './project/project.component';
// import { ProjectsGridComponent } from './projects-grid/projects-grid.component';

import { FlexLayoutModule } from '@angular/flex-layout';
// import { SideNavComponent } from './side-nav/side-nav.component';
import { MainService } from './../main/main.service';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
  ],
  exports: [
    FlexLayoutModule
  ],
  providers: [
    MainService
  ]
})
export class UiModule { }
