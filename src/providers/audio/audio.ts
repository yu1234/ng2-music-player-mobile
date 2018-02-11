import {Injectable} from '@angular/core';
import {AjaxProvider} from "../ajax/ajax";
import {Response} from "../../bean/response";
import {Media, MediaObject} from "@ionic-native/media";

/*
  Generated class for the AudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioProvider {

  private currentSongId: string;
  private currentMedia: MediaObject;

  constructor(public ajax: AjaxProvider, private media: Media) {
    this.currentMedia = this.media.create('');
    console.log('Hello AudioProvider Provider');
  }

  /**
   * 准备播放音乐
   * @param {string} songId
   */
  private preloadMusic(songId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.currentMedia) {
        this.currentMedia.release();
      }
      this.ajax.getSongUrlById(songId).then((res: Response) => {
        if (res.data) {
          this.currentMedia = this.media.create(res.data);
          //播放成功监听
          this.currentMedia.onSuccess.subscribe(() => {
            console.log('Action is successful')
          });
          //播放失败监听
          this.currentMedia.onError.subscribe((error) => {
            console.error(error);
          });
          //状态改变监听
          this.currentMedia.onStatusUpdate.subscribe(status => console.log(status));
          resolve(songId);
        } else {
          reject();
        }
      }).catch((error: Response) => {
        console.error(error);
        reject();
      })
    });
  }

  /**
   * 播放音乐
   */
  public playMusicOnLine(songId: string) {
    if (this.currentSongId !== songId) {
      this.preloadMusic(songId).then(id => {
        this.currentSongId = id;
        this.currentMedia.play({playAudioWhenScreenIsLocked: true});

      }).catch(() => {
        this.currentSongId = '';
      })
    }
  }

  /**
   * 音乐播放完成
   * @param id
   */
  public playComplete(id) {

  }

  public stopMusic(songId: string) {

  }
}
