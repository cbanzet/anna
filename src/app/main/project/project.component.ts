import { SideNavComponent } from '../side-nav/side-nav.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from "@angular/forms";

import { MainService } from './../../main/main.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @ViewChild(SideNavComponent) child : SideNavComponent ;
	project                            : any;
	projectid                          : string;
  imgShown                           : string;
  imgNb                              : number = 0;


  constructor(
  	private ms : MainService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
		// this.project = this.route.params
  //     .switchMap((params: ParamMap) =>
  //       this.ps.getProject(params.get('id')));

    this.route.params.subscribe((params: Params) => {
        this.projectid = params['id'];
    });

    console.log(this.projectid);

    this.project = this.ms.getProject(this.projectid).valueChanges();    

  }

  changeImage(imgShown) {
    if(imgShown) {
      console.log('Change Image');
    }
    else {
      console.log('No Image Shown'); 
    }
  }  

}
