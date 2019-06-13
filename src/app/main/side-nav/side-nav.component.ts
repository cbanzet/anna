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

// export class ChildComponent{
//     constructor(@Inject(ParentComponent) private parent: ParentComponent){

//     }

//     someMethod(){
//         this.parent.aPublicProperty = 2;
//     }
// }
@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  categorie: any;
  categorySelected: string;
  project$: Observable<any[]>;
  categorieFilter$: BehaviorSubject<string|null>;
  categories: Observable<any[]>;
 // @ViewChild(ProjectsGridComponent) child: ProjectsGridComponent;
  category: any;
  sendcategory = '';

  // constructor( @Inject( ProjectsGridComponent) public parent: ProjectsGridComponent,
   constructor(public auth: AuthService,
              private main: MainService,
              private afs: AngularFirestore,
              private route: ActivatedRoute,
              private router: Router) 
  {
  }

  ngOnInit() {
    this.categories = this.main.getCategories();
    console.log('from constructor of parent', this.sendcategory);
  }

  logout() {
    this.auth.signOut();
  }

  sendData(data) {
    this.sendcategory = data;
    this.router.navigate(['' + data]);
  }

}
