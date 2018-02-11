import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopListPage } from './top-list';

@NgModule({
  declarations: [
    TopListPage,
  ],
  imports: [
    IonicPageModule.forChild(TopListPage),
  ],
})
export class TopListPageModule {}
