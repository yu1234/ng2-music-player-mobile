import {AfterContentInit, Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AjaxProvider} from "../../providers/ajax/ajax";
import {Loading} from "ionic-angular/components/loading/loading";
import {Toast} from "@ionic-native/toast";
import {HttpErrorResponse} from "@angular/common/http";
import {NativeStorage} from "@ionic-native/native-storage";
import {TopSheet} from "../../bean/top-sheet";
import {Response} from "../../bean/response";
import {SongSheet} from "../../bean/song-sheet";
import {AudioProvider} from "../../providers/audio/audio";

/**
 * Generated class for the TopListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-list',
  templateUrl: 'top-list.html',
})
export class TopListPage implements AfterContentInit {

  public topList: TopSheet[] = [];
  public songMap: object = {};

  private loading: Loading;

  constructor(private  navCtrl: NavController,
              private navParams: NavParams,
              private  ajax: AjaxProvider,
              private  loadingCtrl: LoadingController,
              private  toast: Toast,
              private nativeStorage: NativeStorage,
              private audio:AudioProvider) {
  }

  ngAfterContentInit(): void {
    this.loading = this.loadingCtrl.create({content: '载入中...'});
    /* this.nativeStorage.getItem('topList')
       .then(data => {
           if (data && data.date && data.content && data.content.length > 0) {
             let date = new Date(data.date).getTime();
             let now = new Date().getTime();
             if ((now - date) / (24 * 3600 * 1000) < 1) {
               this.topList = data.content;
               this.nativeStorage.getItem('topThreeSongMap')
                 .then(
                   data1 => {
                     if (data1 && data1.date && data1.content) {
                       let date1 = new Date(data1.date).getTime();
                       if ((now - date1) / (24 * 3600 * 1000) < 1) {
                         this.songMap = data1.content;
                         this.loading.dismiss();
                       }else {
                         this.getTopList();
                       }
                     } else {
                       this.getTopList();
                     }
                   },
                   error => this.getTopList()
                 ).catch(() => this.getTopList());
             } else {
               this.getTopList();
             }
           } else {
             this.getTopList();
           }
         }, error => {
           this.getTopList();
         }
       ).catch(() => this.getTopList());
 */
    /*  this.nativeStorage.getItem('topList').then(data=>console.log('topList:',data));*/
    this.getTopList()
  }

  /**
   * 获取排行榜歌单
   */
  private getTopList() {
    this.loading.present();
    this.ajax.getSongSheetByType(2).then((songSheets) => {
      if (songSheets) {
        for (let songSheet of songSheets) {
          if (songSheet) {
            let topSheet = new TopSheet();
            topSheet.songSheet = songSheet;
            this.topList.push(topSheet);
          }
        }
        this.getTopThreeSong();
      }

    }).catch((error: HttpErrorResponse) => {
      console.error('获取排行榜歌单:', error);
      this.loading.dismiss();
      this.toast.show('网络异常', 'long', 'center').subscribe();
    });
  }

  /**
   * 获取前三名歌曲
   */
  private getTopThreeSong() {
    if (this.topList && this.topList.length > 0) {
      let songIds = [];
      for (let i = 0, len = this.topList.length; i < len; i++) {
        if (this.topList[i].songSheet && this.topList[i].songSheet.songs && this.topList[i].songSheet.songs.length > 0) {
          let songs = this.topList[i].songSheet.songs;
          for (let j = 0, len1 = songs.length; j < len1; j++) {
            songIds.push(songs[j]);
            this.topList[i].topThreeSong.push(songs[j]);
            if (j >= 2) {
              break;
            }
          }
        }
      }
      /*  this.nativeStorage.setItem('topList', {content: this.topList, date: new Date()})
          .then(
            () => console.log('Stored item!'),
          ).catch();*/
      this.getSongDetail(songIds);
    }
  }

  /**
   * 获取歌曲相信信息
   */
  private getSongDetail(ids: string[]) {
    if (ids && ids.length > 0) {
      let calls = [];
      for (let id of ids) {
        if (!this.songMap[id]) {
          calls.push(this.ajax.getSongById(id));
        }
      }
      Promise.all(calls).then((responses: Response[]) => {
        if (responses && responses.length > 0) {
          for (let response of responses) {
            let song = response.data;
            if (song) {
              this.songMap[song.id] = song;
            }

          }
        }
        /*this.nativeStorage.setItem('topThreeSongMap', {content: this.songMap, date: new Date()})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );*/
        this.loading.dismiss();
      }).catch((reason: Response) => {
        this.loading.dismiss();
      })
    }
  }

  /**
   * 列表项点击事件
   */
  public itemHandleClick(index) {
    if (this.topList && this.topList.length > index) {
      let topSheet:SongSheet = this.topList[index].songSheet;
      if(topSheet&&topSheet.songs&&topSheet.songs.length>0){
        let songs:string[]=topSheet.songs;
        this.audio.playMusicOnLine(songs[0]);
      }
      /*this.navCtrl.push('MusicListPage', {
        id: "123",
        name: "Carl"
      });*/
    }
  }

}
