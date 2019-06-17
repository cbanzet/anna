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
	projectImages: any;
  imgUrlPrint: string;
  imgShown:number = 0;
  isLoaded: boolean= false;
  showThumbOrCarousel: boolean= true;

  constructor(public auth: AuthService,private ms : MainService) 
  { 
  }

  ngOnInit() {
  	this.project = this.ms.getProjectWithKey(this.projectkey);
		this.imgUrlPrint = 'https://firebasestorage.googleapis.com/v0/b/anna-lemoine-prod.appspot.com/o/theme%2Floading.gif?alt=media&token=50bb4018-efce-4eea-a4d3-93872c9996fd';
    this.imgShown = 0;
  }

  loadingImg() {
    // this.showCredit = false;
    this.imgUrlPrint = 'https://firebasestorage.googleapis.com/v0/b/alaingutharc-525c6.appspot.com/o/theme%2Floading.gif?alt=media&token=453f1e7f-3a69-4ea1-b5a0-54e0b898b5a2';
  }

  CheckIfImgLoaded(img) {
    this.imgUrlPrint = img.url;
    // setTimeout(() => (this.showCredit = true), 500); 
    // setTimeout(() => this.showPressBioFooterArrows(500), 1000); 
  }

  clickOnImg(nb:number) {
    this.imgShown = (this.imgShown+1)<nb ? this.imgShown+1 : 0;
  }

  loadImagesFromService() {
  	this.projectImages = this.ms.getImagesProjects(this.projectkey); 
  	this.showThumbOrCarousel = false;
  }

}
