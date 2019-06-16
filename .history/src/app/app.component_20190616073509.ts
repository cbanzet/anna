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
  category = [];

  constructor(private auth: AuthService,
              private  afs: AngularFirestore) {
    this.projectsCollection   = this.afs.collection('projects', (ref) => ref.orderBy('date', 'desc'));
    this.getProjects().subscribe((data) => {
          data.forEach(function (value) {
            for (let i = 0; i < value.categories.length; i++) {
               console.log(value.categories[i]);
            }
          }); 
    });
  }

}
