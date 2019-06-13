import { Component, OnInit } from '@angular/core';
import { MainService } from './../main.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

	title:string;
	subtitle:string;
	date:string;
	content:string;

  constructor(private ms: MainService,) { }

  ngOnInit() {
  }

  clickHandler() {
    this.ms.createProject(this.title, this.subtitle, this.date, this.content);
    this.resetForm();
  }

  resetForm() {
  	this.title = '';
  	this.subtitle = '';
  	this.date = '';
  	this.content= '';
  }

}
