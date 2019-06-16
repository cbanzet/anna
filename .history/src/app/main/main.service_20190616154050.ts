import { Injectable } from '@angular/core';

import {  AngularFirestore, 
          AngularFirestoreCollection, 
          AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  projectsCollection    : AngularFirestoreCollection<any>;
  clientCollection      : AngularFirestoreCollection<any>;  
  projectDocument       : AngularFirestoreDocument<any>;

  categoriesCollection  : AngularFirestoreCollection<any>;
  categoryDocument      : AngularFirestoreDocument<any>;

  project : Observable<any>; 

  constructor(private afs: AngularFirestore) { 
    this.projectsCollection   = this.afs.collection('projects', (ref) => ref.orderBy('date', 'desc'));
    this.categoriesCollection = this.afs.collection('categories');
    this.clientCollection = this.afs.collection('clients');

  }

  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ///////////////////////// G E T ////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.projectsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }
  

  getProjects() {
    return  this.projectsCollection.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.doc.data(), 
        { $key: snap.payload.doc.id }) );
    });
  }

  getProjectWithKey(key: string): Observable<any> {
    const projectPath = `projects/${key}`;
    this.project = this.afs.doc<any>( projectPath)
      .snapshotChanges().map(action => {
        const data = Object.assign(action.payload.data(), 
        { 
          date: action.payload.data().date ? action.payload.data().date.toDate() : null,           
          $key: action.payload.id 
        });
        return data;
      });
    return this.project;
  }

  getProject(id: string) {
    return this.afs.doc<any>(`projects/${id}`);
  }

  getCategories():Observable<any[]> {
      return this.categoriesCollection.snapshotChanges().pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            return { id: a.payload.doc.id, ...data };
          });
        })
      );
  }

  getClientList() {
    return this.clientCollection.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.doc.data(),{
           $key: snap.payload.doc.id,
           firstname: snap.payload.doc.data().firstname, 
           lastname: snap.payload.doc.data().lastname,
           email: snap.payload.doc.data().email,
           phone: snap.payload.doc.data().phone }) );  
    });
  }

  addClientInProject(client,projectId) { 
    const batch               = this.afs.firestore.batch();
   // const clientkey           = client.$key?client.$key:null;
    const updateField         = {} ;
    updateField['client']     = client;
    const clientRef           = this.afs.collection('projects').doc(projectId).ref;
    batch.set(clientRef, updateField, {merge:true});
    batch.commit()
    .then(function() {
      console.log('Batch Commited');
    })
    .catch(function(err) {
      console.error(err);
    });
  }


  getCategory(id: string) {
    return this.afs.doc<any>(`categories/${id}`);
  }


  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////// C R E A T E ////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  createProject(title: string, subtitle: string, date:string, content:string) {
    const project = {
      title,
      subtitle,
      content,
      timestamp: Date.now(),
      date: new Date(date),
      categories: []
      // date: Date.now()
    };
    return this.projectsCollection.add(project);
  }

  createClient(newClientForm: NgForm, projectId) {

      const db = firebase.firestore();
      const batch = this.afs.firestore.batch();
      const newClientData            = {};
      newClientData['timestamp']   = Date.now();    
      newClientData['firstname']   = newClientForm?newClientForm.value.newClientfirstname:0;
      newClientData['lastname']    = newClientForm?newClientForm.value.newClientlastname:0;
      newClientData['email']       = newClientForm?newClientForm.value.newClientemail:0;
      newClientData['phone']       = newClientForm?newClientForm.value.newClientphone:0;
      const clientkey              = db.collection('clients').doc().id;
     // const clientRef = this.afs.collection('clients').doc(clientkey).ref;
    //  batch.set(clientRef, newClientData );
      this.addClientInProject(newClientData,projectId);

      return this.clientCollection.add(newClientData);

  }


  addProjectCategory(id,categories) {
    const batch   = this.afs.firestore.batch();
    const updateArtistField = {} ;
    updateArtistField['categories'] = categories;
    const projectRef = this.afs.collection('projects').doc(id).ref;
    batch.set(projectRef, updateArtistField, {merge:true});
    batch.commit().then(function() {console.log('Batch Commited'); });

  }

  addCategories(categories,id) {
    const batch   = this.afs.firestore.batch();
    const updateArtistField = {} ;
    updateArtistField['categories'] = categories;
    const projectRef = this.afs.collection('categories').doc(id).ref;
    batch.set(projectRef, updateArtistField, {merge:true});
    batch.commit().then(function() {console.log('Batch Commited'); });
  }


  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////// U P D A T E ////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////



  updateProject(id, field, value) {
    // console.log(id,field,value);
    var updateField          = {};
    updateField[`${field}`]  = value;    
    return this.getProject(id).update(updateField);
  }

  insertImageInProjectCollection(id, value) {
    var imageData            = {};
    // const uploadRef          = firebase.firestore().collection('projects').doc();
    // const uploadkey          = uploadRef.id;
    const uploadRef           = firebase.firestore().collection('uploads').doc();
    const uploadkey           = uploadRef.id;

    imageData['position']    = Date.now();
    imageData['timestamp']   = Date.now();
    imageData['url']         = value;
    var batch                = this.afs.firestore.batch();
    const projectRef         = this.projectsCollection.doc(id)
                                                      .collection('images')
                                                      .doc(uploadkey).ref;
    batch.set(projectRef, imageData );
    batch.set(uploadRef,  imageData);
    batch.commit().then(function() {console.log('image uploaded')});
  }

  getImagesProjects(projectId) {
    return this.projectsCollection.doc(projectId).collection('images').snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }

  // getArtistImages(key: string) {
  //   return this.afs.collection('members').doc(key)
  //                   .collection('images', ref => ref.orderBy('position')).snapshotChanges().map(arr => {
  //     return arr.map(snap => Object.assign(
  //       snap.payload.doc.data(),{ $key: snap.payload.doc.id }) )
  //   })    
  // }  

  deleteImagesInProjectCollection(projectId,imageId) {
    const batch                = this.afs.firestore.batch();
    const deleteProjectRef         = this.projectsCollection.doc(projectId)
                                                      .collection('images')
                                                      .doc(imageId).ref;

    batch.delete(deleteProjectRef);
    batch.commit().then(function() {console.log('deleted')});
  }

  updateImagePosition(projectid,image, newpos:number) {

    var imagekey       = image.$key ? image.$key : null;

    const db           = firebase.firestore();
    const batch        = this.afs.firestore.batch();

    const imagesRef    = db.collection('uploads').doc(imagekey);
   batch.update(imagesRef, 'position', newpos);
   const imageInProjectRef = db.collection('projects').doc(projectid).collection('images').doc(imagekey);
   batch.update(imageInProjectRef, 'position', newpos);
    batch.commit()
    .then(function() {
      console.log('Image Position Updated');
      return 'done';
    })
    .catch(function(error){ console.error("Error Updating document: ", error);}); 

  }

  removeArtistImage(projectid,image) {

    // const memberkey = member.$key;
    const imgkey    = image.$key;
    const url       = image.url;
    // const name      = image.name;    

    console.log(url);

    var storage = firebase.storage();
    var storageRef = storage.ref();
    var imageStorageRef = storageRef.child('carousel');
    var imageToDeleteRef = storageRef.child('carousel/'+name);

    imageToDeleteRef.delete().then(function() { console.log("Image Deleted")}).catch(function(error) { console.error(error)});

    const imageRef  = this.afs.collection('projects').doc(projectid).collection('images').doc(imgkey).ref;
    const uploadRef = this.afs.collection('uploads').doc(imgkey).ref;

    const batch = this.afs.firestore.batch();
    batch.delete(imageRef);
    batch.delete(uploadRef);
        
    batch.commit().then(function() {console.log('Batch Commited')}).catch(function(err) {console.error(err);});

  }

  getArtistImages(key: string) {
    return this.afs.collection('projects').doc(key)
                    .collection('images', ref => ref.orderBy('position')).snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.doc.data(),{ $key: snap.payload.doc.id }) );
    })    
  }  





  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  /////////////////////// D E L E T E ////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////


  deleteProject(id: string) {
    return this.getProject(id).delete();
  }

  removeClientInProject(projectId) {  
   // const projectkey            = project.$key;
    const batch                = this.afs.firestore.batch();
    const clientRef            = this.afs.collection('projects').doc(projectId).ref;   
    const updateField          = {} ; 
    batch.update( clientRef, {['client']: firebase.firestore.FieldValue.delete()}); 
    batch.update(clientRef, updateField); 

    batch.commit().then(function() {console.log('Batch Delete')}).catch(function(err){ console.log(err)}); 
   
  }




}


