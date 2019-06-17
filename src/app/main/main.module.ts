import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './../ui/material/angularmaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectComponent } from './project/project.component';
import { ProjectsGridComponent } from './projects-grid/projects-grid.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { GridSidNavComponent } from './grid-sid-nav/grid-sid-nav.component';

import { ContactComponent } from './contact/contact.component';
import { MainService } from './main.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../core/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectImagesComponent } from './project-images/project-images.component';
import { FileSizePipe } from './project-images/file-size.pipe';
import { DropZoneDirective } from './project-images/drop-zone.directive';
import { HeaderAnnaComponent } from './header-anna/header-anna.component';
import { ImagesComponent } from './project-detail/images/images.component';
import { ProjectCapsuleComponent } from './project-capsule/project-capsule.component';

@NgModule({
  declarations: [
    ProjectDetailComponent, 
    LoginComponent, 
    DashboardComponent, 
    ProjectComponent,
    ProjectsGridComponent,
    SideNavComponent,
    GridSidNavComponent,
    ContactComponent,
    ProjectsGridComponent,
    ProjectFormComponent,
    ImagesComponent, 
    ProjectImagesComponent, FileSizePipe, DropZoneDirective, HeaderAnnaComponent, ProjectCapsuleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,  
    FlexLayoutModule,
    AngularFontAwesomeModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  exports: [
    FlexLayoutModule,
    SideNavComponent
  ],  
  providers: [
    MainService,
    AuthService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  

})
export class MainModule { }
