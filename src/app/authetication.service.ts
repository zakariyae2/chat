import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './services/api/api.service';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AutheticationService {

  public _uid = new BehaviorSubject<any>(null);
  currentUser : any;

  constructor(public ngFireAuth: AngularFireAuth, private fireAuth: Auth, private apiService: ApiService) { }
  async registerUser(formValue: any) {
    try {
      console.log('formValue.email:', formValue.email);
      const registeredUser = await createUserWithEmailAndPassword(this.fireAuth, formValue.email, formValue.password);
      console.log('registered user:', registeredUser);
      
      const data = {
        name: formValue.fullname,
        email: formValue.email,
        uid: registeredUser.user.uid
      };
  
      await this.apiService.setDocument(`users/${registeredUser.user.uid}`, data);
  
      const userData = {
        id: registeredUser.user.uid
      };
  
      return userData;
    } catch (e) {
      throw e;
    }
  }
  async loginUser(email:string, password:string){
    return await this.ngFireAuth.signInWithEmailAndPassword(email, password)
  }
  async resetPassword(email:string){
    return await this.ngFireAuth.sendPasswordResetEmail(email)
  }
  async signOut(){
    return await this.ngFireAuth.signOut()
  }
  checkAuth():Promise<any>{
    return new Promise((resolve,reject)=>{
      onAuthStateChanged(this.fireAuth, user => {
        console.log('auth user: ',user);
        resolve(user)
      });
    });
  }
  async getUserData(id:any){
    const docSnap : any = await this.apiService.getDocById(`users/${id}`);
    if(docSnap?.exists()){
      return docSnap.data();
    }
    else{
      throw('No such documents exists');
    }

  }
  getId() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    console.log(this.currentUser);
    return this.currentUser?.uid;
  }
  setUserData(uid : any){
    this._uid.next(uid);
  }
  randomIntFromInterval(min : any, max : any){
    return Math.floor(Math.random() * (max - min +1) + min);
  }
}
