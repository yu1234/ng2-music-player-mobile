import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public commonProvider: CommonProvider) {

  }

}
