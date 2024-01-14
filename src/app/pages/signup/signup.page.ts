import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AutheticationService } from 'src/app/authetication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  regForm: FormGroup;
  constructor(public formBuilder:FormBuilder, public loadadingCtrl:LoadingController, public authService:AutheticationService,
     public router : Router,
     private alertController: AlertController) { }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      fullname : ['',[Validators.required]],
      email : ['',[
        Validators.required,
        Validators.email,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),
      ]],
      password : ['',[
        Validators.required,
        Validators.pattern(".{8,}")
      ]]
    })
  }
  get errorControl(){
    return this.regForm.controls;
  }
  async signUp() {
    const loading = await this.loadadingCtrl.create();
    await loading.present();
  
    if (this.regForm?.valid) {
      try {
        const { fullname, email, password } = this.regForm.value;
        const user = await this.authService.registerUser({ fullname, email, password });
        loading.dismiss();
        this.router.navigate(['/loby']);
      } catch (error: any) {
        console.error(error);
        loading.dismiss();
        // Provide user-friendly error messages
        let msg:string = 'Could not sign you up please try again';
        if (error.code === 'auth/email-already-in-use') {
          // Handle email already in use
          console.log('Email is already in use.');
          msg = 'Email is already in use.';
          this.showAlert(msg);
        } 
        this.showAlert(msg);
      }
    }
  }
  async showAlert(msg:any){
    const alert = await this.alertController.create({
      header: 'Alert',
      //subHeader: 'Important message',
      message: 'this is an alert!',
      buttons: ['OK'],
    });
  }

}
