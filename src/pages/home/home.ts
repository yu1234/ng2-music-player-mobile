import {AfterViewInit, Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {StatusBar} from "@ionic-native/status-bar";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterViewInit {

  section: string = 'two';
  somethings: any = new Array(20);

  constructor(private statusBar: StatusBar) {

  }

  ngAfterViewInit(): void {
  }

  public collapsingChange(event: boolean) {
    console.log('collapsingChange', event);
  }
}
