import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusicListPage } from './music-list';

@NgModule({
  declarations: [
    MusicListPage,
  ],
  imports: [
    IonicPageModule.forChild(MusicListPage),
  ],
})
export class MusicListPageModule {}
