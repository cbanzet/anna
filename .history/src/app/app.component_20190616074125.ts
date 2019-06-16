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
  }

}
