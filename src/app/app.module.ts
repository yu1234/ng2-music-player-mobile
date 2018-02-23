import {BrowserModule} from '@angular/platform-browser';
import {Pro} from '@ionic/pro';
import {ErrorHandler, Injectable, Injector, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {Toast} from '@ionic-native/toast';
import {NativeStorage} from '@ionic-native/native-storage';
import {NativeAudio} from '@ionic-native/native-audio';
import {Media} from '@ionic-native/media';
import {Keyboard} from '@ionic-native/keyboard';

import {MyApp} from './app.component';
import {CommonProvider} from '../providers/common/common';
import {AjaxProvider} from '../providers/ajax/ajax';
import {GlobalProvider} from '../providers/global/global';
import {AudioProvider} from '../providers/audio/audio';


Pro.init('237a2431!', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch (e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: true,
      autoFocusAssist: false,
      platforms: {
        ios: {
        },
        android: {
          mode: 'md'
        }
      }
    }),
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
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    CommonProvider,
    AjaxProvider,
    AudioProvider
  ]
})
export class AppModule {
}
