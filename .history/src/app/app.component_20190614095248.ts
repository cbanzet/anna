import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import {  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument } from '@angular/fire/firestore';
  import { Observable } from 'rxjs';


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
  }


  getProjects():Observable<any[]> {
    return  this.projectsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
}

}
