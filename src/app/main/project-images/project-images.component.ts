import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { MainService } from './../../main/main.service';

import { finalize } from 'rxjs/operators';


@Component({
  selector: 'project-images',
  templateUrl: './project-images.component.html',
  styleUrls: ['./project-images.component.css']
})
export class ProjectImagesComponent implements OnInit {

	@Input() projectkey: string;
	@Input() projectImagesArray: [any];
	@Output() imageUploaded = new EventEmitter<boolean>();

	imagesRecevied : any;

  task       	: AngularFireUploadTask;
  percentage 	: Observable<number>;
  snapshot   	: Observable<any>;
  downloadURL	: Observable<string>;
  isHovering 	: boolean;
  onlyOnce		: boolean = true;

  constructor(
  	private storage	: AngularFireStorage, 
  	private db     	: AngularFirestore,
  	private ms     	: MainService) { }

  ngOnInit() {
  	console.log(this.projectImagesArray);
  	this.imagesRecevied = this.projectImagesArray ? this.projectImagesArray : [];
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Anna Lemoine' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    const fileRef = this.storage.ref(path);

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe()

  }

  saveImageToFirestore(url:string) {
    if(this.onlyOnce) {
    	// this.imagesRecevied.push(url);
			// console.log(this.imagesRecevied); 
     	// this.ms.updateProject({ id: { id: this.projectkey, field: 'images', value: this.imagesRecevied } });
      this.ms.insertImageInProjectCollection(this.projectkey, url);
     	this.imageUploaded.emit(true);
	    this.onlyOnce = false;
    }


  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}
