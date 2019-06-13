import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AuthGuard } from './core/auth.guard';
// import { UserLoginComponent } from './ui/user-login/user-login.component';
// import { UploadPageComponent } from './uploads/upload-page/upload-page.component'
// import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';

import { ProjectDetailComponent } from './main/project-detail/project-detail.component';
import { ProjectsGridComponent } from './main/projects-grid/projects-grid.component';
import { ContactComponent } from './main/contact/contact.component';
import { ProjectComponent } from './main/project/project.component';

import { LoginComponent } from './main/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { DashboardComponent } from './main/dashboard/dashboard.component';


const routes: Routes = [
  // { path: 'login', component: UserLoginComponent },
  // { path: 'projects', component: ProjectsListComponent,  canActivate: [AuthGuard] },
  // { path: 'uploads',  component: UploadPageComponent,  canActivate: [AuthGuard] },
  // { path: 'ssr', component: SsrPageComponent }
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  { path: 'dashboard',    component: DashboardComponent, canActivate: [AuthGuard]},  
  { path: 'edit/:id',     component: ProjectDetailComponent, canActivate: [AuthGuard]},  
  { path: 'login',        component: LoginComponent },  
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////
  { path: 'contact',      component: ContactComponent},
  { path: 'project/:id',  component: ProjectComponent },
  { path: '',             component: ProjectsGridComponent },
  // { path: '**',           component: PageNotFoundComponent },
  { path: ':cat',         component: ProjectsGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }