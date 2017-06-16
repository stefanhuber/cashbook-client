import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { MemberProvider } from '../providers/member/member';
import { ProjectProvider } from '../providers/project/project';
import { TransactionProvider } from '../providers/transaction/transaction';

// MemberProvider.URI_ENDPOINT  = '/api';
// ProjectProvider.URI_ENDPOINT = '/api';
// TransactionProvider.DB_ENDPOINT = 'http://TOKEN@localhost:8000/db/PROJECTID';

MemberProvider.URI_ENDPOINT  = 'https://cashbook-server.sloppy.zone';
ProjectProvider.URI_ENDPOINT = 'https://cashbook-server.sloppy.zone';
TransactionProvider.DB_ENDPOINT = 'https://TOKEN@cashbook-server-couchdb.sloppy.zone/PROJECTID';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MemberProvider,
    ProjectProvider,
    TransactionProvider
  ]
})
export class AppModule {}
