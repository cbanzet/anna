import { MainService } from './../main.service';
import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs/Rx';
// import { Component, ViewChild } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'projects-grid',
  templateUrl: './projects-grid.component.html',
  styleUrls: ['./projects-grid.component.css']
})
export class ProjectsGridComponent implements OnInit {

 // @ViewChild(SideNavComponent) child: SideNavComponent;
  categorie: any;
  categorySelected: string;
  project$: Observable<any[]>;
  categorieFilter$: BehaviorSubject<string|null>;
  categories: Observable<any[]>;
  category: any;
  received: any;
  // projects: Observable<any[]>;
  isloading =  true;

  constructor(public auth: AuthService,
              private main: MainService,
              private route: ActivatedRoute,
              private router: Router,
              private afs: AngularFirestore) {
                this.route.params.subscribe((params: Params) => {
                  this.category = params['cat']; });
                  // console.log(this.category)
              }

  ngOnInit() {

    this.categorieFilter$ = new BehaviorSubject(null);
    this.categories = this.main.getCategories();
    this.project$ =  Observable.combineLatest(
      this.categorieFilter$
    ).switchMap(([categorie]) => 
      this.afs.collection<any>('projects', ref => {
        let query: firebase.firestore.Query = ref;
        if (categorie) { 
          query =  query.where('categories', 'array-contains', categorie);
        }
       // else {query = query.where('role', '==', 'Artist').where('isonline', '==', true).orderBy("lastname"); }
        return query;
      }).snapshotChanges()
      .map(arr => {
                    return arr.map(snap => Object.assign(
                      snap.payload.doc.data(),
                      { $key: snap.payload.doc.id }) );
                  })
    );
     this.filterByCategory(this.category);
     // this.filterByCategory();
  }

  filterByCategory(categorie) {
    // console.log(this.category);
    this.categorySelected = categorie;
    this.categorieFilter$.next(categorie);
  }

  logout() {
    this.auth.signOut();
  }

}



