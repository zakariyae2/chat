import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, query, setDoc, collection as firestoreCollection } from '@angular/fire/firestore';
import { addDoc, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private firestore: Firestore) { }
  docRef(path: any) {
    return doc(this.firestore, path)
  }

  collectionRef(path:any){
    return collection(this.firestore, path);
  }

  setDocument(path:any,data:any){
    const dataRef = this.docRef(path);
    return setDoc<any,any>(dataRef, data);
  }
  getDocById(path:any){
    const dataRef = this.docRef(path);
    return getDoc(dataRef);
  }

  collectionDataQuery(path:any, queryFn?:any){
    let dataRef:any = this.collectionRef(path);
    if(queryFn){
      const q = query(dataRef, queryFn);
      dataRef = q;
    }
    //let collection_data;
    //if(id) collection_data = collectiondata<any>(dataRef, {idField: 'id'});
    const collection_data = collectionData<any>(dataRef);
    return collection_data;
  }

  whereQuery(fieldPath:any, condition:any, value:any){
    return where(fieldPath, condition, value);
  }
  addDocument(collectionPath: string, data: any): Promise<any> {
    const collectionRef = firestoreCollection(this.firestore, collectionPath);
    return addDoc(collectionRef, data);
  }

}
