import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';
import { NativeStorage } from '@ionic-native/native-storage';
import { NativeAudio } from '@ionic-native/native-audio';
import { Media } from '@ionic-native/media';


import {MyApp} from './app.component';
import {CommonProvider} from '../providers/common/common';
import { AjaxProvider } from '../providers/ajax/ajax';
import { GlobalProvider } from '../providers/global/global';
import { AudioProvider } from '../providers/audio/audio';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {mode: 'md'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Toast,
    NativeStorage,
    NativeAudio,
    Media,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    CommonProvider,
    AjaxProvider,
    AudioProvider
  ]
})
export class AppModule {
}
