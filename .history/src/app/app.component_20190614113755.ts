import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import {  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument } from '@angular/fire/firestore';
  import { Observable } from 'rxjs';


  import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ANNA LEMOINE';
  projectsCollection    : AngularFirestoreCollection<any>;

  constructor(private auth: AuthService,
              private  afs: AngularFirestore) {
    this.projectsCollection   = this.afs.collection('projects', (ref) => ref.orderBy('date', 'desc'));
    this.getProjects().subscribe((data) => {
          // console.log(data);
          data.forEach(function (value) {
            console.log(value.categories);
          }); 
    });
  }

  getProjects() {
    return  this.projectsCollection.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.doc.data(), 
        { $key: snap.payload.doc.id }) );
    });
  }

}
