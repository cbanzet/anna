import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main.service';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'project-capsule',
  templateUrl: './project-capsule.component.html',
  styleUrls: ['./project-capsule.component.css']
})
export class ProjectCapsuleComponent implements OnInit {

	@Input() projectkey : string;
	project: any;


  constructor(public auth: AuthService,private ms : MainService) 
  { 
  }

  ngOnInit() {
  	this.project = this.ms.getProjectWithKey(this.projectkey);
  }

}
