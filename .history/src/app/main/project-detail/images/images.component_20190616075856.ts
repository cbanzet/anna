import { Component, OnInit, Input } from '@angular/core';
import { MainService } from 'src/app/main/main.service';

@Component({
  selector: 'images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

	@Input() projectid : string;
	images : any;
	counter: number = 1;

  constructor(private ms: MainService) { }

  ngOnInit() {
	  // this.images = this.ms.getArtistImages(this.memberkey);
	  this.ms.getArtistImages(this.projectid).subscribe((data) => {
		this.images = data ;
		// console.log(this.images);
	  });
  }

  changeImagePostion(closeimage,image) {

  	var newPositionOfImageMoved = closeimage.position;
  	this.ms.updateImagePosition(this.projectid,image,newPositionOfImageMoved);

  	var newPositionOfImageReplaced = image.position;
		this.ms.updateImagePosition(this.projectid,closeimage,newPositionOfImageReplaced);

	}
	
	selectImageForThumb(image) {
    this.ms.updateProject( this.projectid, 'thumb', image);
  }

  reAttributeImagesPosition(images) {
  	console.log(images);
  	var count = 1;
  	if(images.length) {
  		for(let i=0; i < images.length; i++) {
  			console.log(images[i]);
  			console.log(count);
  			this.ms.updateImagePosition(this.projectid,images[i],count);
  			count++;
  		}
  	}
  }

  removeArtistImage(image) {
  	this.ms.removeArtistImage(this.projectid,image);
  }


}
