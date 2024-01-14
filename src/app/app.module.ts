import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig), provideFirebaseApp(() => initializeApp({"projectId":"dev-test-c9cb4","appId":"1:45425656532:web:db5d321782c86cb3557141","storageBucket":"dev-test-c9cb4.appspot.com","apiKey":"AIzaSyBHIP-iuYxFN0WvskDdj_XvAImOXMM31Mc","authDomain":"dev-test-c9cb4.firebaseapp.com","messagingSenderId":"45425656532","measurementId":"G-MPSVXFQ859"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), FontAwesomeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
