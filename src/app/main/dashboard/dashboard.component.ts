import { Component, OnInit , ViewChild } from '@angular/core';
// import { SideNavComponent } from '../../ui/side-nav/side-nav.component';
import 'rxjs/add/operator/switchMap';
// import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 //  @ViewChild(SideNavComponent) child: SideNavComponent;

	showprojects:boolean= true;
	shownewproject:boolean= false;
  // project$: Observable<any[]>;

  constructor() { }

  ngOnInit() {
    // this.project$ = this.child.project$ ;
  }

}
