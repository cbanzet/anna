import { MainService } from './../main.service';
import { ProjectsGridComponent } from './../projects-grid/projects-grid.component';
import { Component, OnInit , ViewChild, Inject } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: "grid-sid-nav",
  templateUrl: "./grid-sid-nav.component.html",
  styleUrls: ["./grid-sid-nav.component.scss"]
})

export class GridSidNavComponent implements OnInit {
  categories: Observable<any[]>;
  
  constructor( @Inject( ProjectsGridComponent) public parent: ProjectsGridComponent,
                                                public auth: AuthService,
                                                private main: MainService,
                                                private afs: AngularFirestore,
                                                private route: ActivatedRoute,
                                                private router: Router) {

  }



  ngOnInit() {
    this.categories = this.parent.categories;
  }

  filterByCategory(category) {
    this.parent.filterByCategory(category);
  }

   logout() {
      this.auth.signOut();
    }
}
