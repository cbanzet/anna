import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { FormsModule, NgForm, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MainService } from './../../main/main.service';
import { tap, switchMap, take, map, timestamp, catchError, finalize, retry, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
	
	project: any;
	projectid: string;
	hideDateForm: boolean= true; 

  // for chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categories: any;
  formAddClient:boolean=false;
  // select client
  clientCtrl : FormControl = new FormControl();
  filteredClients: Observable<any[]>;
  selectedClient:Observable<any[]>;
  clients: Observable<any[]>; 
  searchClientForm: boolean=true;  
  showUploadImages: boolean;
  images: { id: string; }[];
  artistImages: Observable<{}>;
  projectsCollection: any;
  allCategories: Array<any> ;
  doublecategory: any;
  key: any;
  categoriesListInCollection: any[];
  // allCategories = [];

  constructor(
  	private ms: MainService,
  	private route: ActivatedRoute,
  	private router: Router) {
        this.clients = this.ms.getClientList();  
        this.route.params.subscribe((params: Params) => {
        this.projectid = params['id']; });
        this.project = this.ms.getProjectWithKey(this.projectid);
        this.categories = this.ms.getCategories();
        this.ms.getImagesProjects(this.projectid).subscribe((data) => {
          this.images = data ;
        });

        this.artistImages = this.route.paramMap
        .switchMap((params: ParamMap) =>
          this.ms.getArtistImages(params.get('id')));

          this.ms.getProjects().subscribe((data:any) => {
            this.allCategories = data ;
          });

          this.ms.getCategoriesList().subscribe((data) => {
            this.key = data[0].$key;
            this.categoriesListInCollection = data ;
          });
    }

  ngOnInit() {

     this.filteredClients = this.clientCtrl.valueChanges
     .startWith(null)
     .switchMap(client => {
       if(client) {
         if(client.lastname) { 
           console.log(client)
           // this.selectedClientFromSearchForm = true;
           this.searchClientForm = false;
           // this.showClient = true;
           this.selectedClient = client;
           this.ms.addClientInProject(client, this.projectid); 
           return this.clients;
         } else { return this.filterClients(client); }
       } else {
         return this.filterClients('something');
       }
     });
  }

  onSubmit(newClientForm: NgForm) {
   this.ms.createClient(newClientForm,this.projectid); 
    this.formAddClient = false;
  }

  deleteClientInProject(){
    this.ms.removeClientInProject(this.projectid);
    this.searchClientForm = true;
  }

  // filterClients(val: string) {
  //   // console.log(val);
  //   return this.clients
  //   .map(response => response.filter(client => { 
  //     if(Number.isInteger(+val)) 
  //     {
  //       return client.phone.toLowerCase().indexOf(val.toLowerCase()) === 0;
  //     } 
  //     else
  //     {      
  //       return (client.firstname.toLowerCase().indexOf(val.toLowerCase()) === 0)
  //       || (client.lastname.toLowerCase().indexOf(val.toLowerCase()) === 0);
  //     }   
  //   }));
  // }

  filterClients(val: string) {
    // console.log(val);
    return this.clients
    .map(response => response.filter(client => {     
        if(client.name) return (client.name.toLowerCase().indexOf(val.toLowerCase()) === 0)   
        else return null;
    }));
  }


  displayFn(client) {
    if(client) {
      var name = `${client.name}`;      
    }
    else var fullname = '';
    return client ? name : client;
  }

 
  add(event: MatChipInputEvent,categories, arrayCat): void {
  	
  	console.log(event);
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
       // this.categories.push({name: value.trim()});
     categories.push(value.trim());
     this.ms.addProjectCategory(this.projectid,categories);
     const item = arrayCat[0].categories.find((Obj) =>  Obj ===  value.trim());
     const id = arrayCat[0].id ;
     if (item === undefined) {
         arrayCat[0].categories.push(value.trim());
         console.log(arrayCat);
        this.ms.addCategories(arrayCat[0].categories, id );
     } else {
       console.log('this data existed');
     }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  getAllCategoriesInProjectCollection() {
      const categoriesListInAllprojects = [] ;
      this.allCategories.forEach((val) => {
        val.categories.forEach((element) => {
        categoriesListInAllprojects.push(element);
        });
     });
     return categoriesListInAllprojects ;
  }

  verifyIfCategoryExistInProjectCollection(categorie) {
    const index2 =   this.getAllCategoriesInProjectCollection().indexOf(categorie);
    console.log(index2);
     if (index2 >= 0) {
      this.getAllCategoriesInProjectCollection().splice(index2, 1);
        const index3 = this.getAllCategoriesInProjectCollection().indexOf(categorie, 2);
        if(index3 >= 0) {
          return true ;
        }else { return false ; }
      }else { return false; }
  }

  deleteCategoryInProjectCollection(categories, categorie, arrayCat) {
      const index = categories.indexOf(categorie);
      const doubleCategoryInProject = this.verifyIfCategoryExistInProjectCollection(categorie);
      // console.log(doubleCategoryInProject);
      // const categoryId = this.categoriesListInCollection[0].$key;
      // const categoryList = this.categoriesListInCollection[0].categories ;
      // if (index >= 0) {
      //   categories.splice(index, 1);
      //   this.ms.addProjectCategory(this.projectid,categories);
      // }
      // if (doubleCategoryInProject !== null) {
      //   const index2 =  categoryList.indexOf(categoryId);
      //   categoryList.splice(index2);
      //   this.ms.addCategories(categoryList, categoryId);
      //   console.log(index2);
      //   console.log(doubleCategoryInProject);
      // }
      // console.log(this.getAllCategoriesInProjectCollection());

      
  }

  remove(categories,categorie, arrayCat): void {
    this.deleteCategoryInProjectCollection(categories, categorie, arrayCat);
  }

  updateProject(field,value) {
    this.ms.updateProject( this.projectid, field, value );
    if(field=='date') {
    	this.hideDateForm = true;
    }
  }

  launchFunctionWithTimeOut ($event) {
     setTimeout(() => this.hideImageUploadForm(), 1000);
  }

  hideImageUploadForm() {
    this.showUploadImages = false;
  }

  deleteImage(projectId, imageId) {
    this.ms.deleteImagesInProjectCollection(projectId,imageId);
  }

  selectImageForThumb(image) {
    this.ms.updateProject( this.projectid, 'thumb', image);
  }

}

