import {NgModule} from '@angular/core';
import {CollapsingHeaderComponent} from './collapsing-header/collapsing-header';
import {StatusBar} from "@ionic-native/status-bar";
import {NativeStorage} from "@ionic-native/native-storage";
import {NativeAudio} from "@ionic-native/native-audio";
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [CollapsingHeaderComponent],
  imports: [IonicModule],
  providers: [
    StatusBar,
    NativeStorage,
    NativeAudio],
  exports: [CollapsingHeaderComponent]
})
export class ComponentsModule {
}
