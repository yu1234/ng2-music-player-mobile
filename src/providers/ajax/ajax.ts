import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SongSheet} from "../../bean/song-sheet";
import {GlobalProvider} from "../global/global";
import {Song} from "../../bean/song";
import {Response} from "../../bean/response";

/*
  Generated class for the AjaxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AjaxProvider {

  constructor(public http: HttpClient, public global: GlobalProvider) {
    console.log('Hello AjaxProvider Provider');
  }

  /**
   * 根据type获取歌单
   * @param {number} type
   */
  public getSongSheetByType(type: number): Promise<SongSheet[]> {
    const url = `${this.global.api.songSheetByType + type}`;
    return this.http.get(url).toPromise().then(response => response as SongSheet[]);
  }

  /**
   * 根据id获取歌曲信息
   * @param {number} type
   */
  public getSongById(id: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (id) {
        const url = `${this.global.api.songById + id}`;
        this.commonRequestByGet(url).then(response => resolve(response)).catch(reason => reject(reason));
      } else {
        reject(this.global.getResponseErrorObj());
      }
    });
  }

  /**
   * 根据id获取歌曲播放路径
   * @param {number} type
   */
  public getSongUrlById(id: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      if (id) {
        const url = `${this.global.api.songUrlById + id}`;
        this.commonRequestByGet(url).then(response => resolve(response)).catch(reason => reject(reason));
      }
    });
  }

  public commonRequestByGet(url: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.http.get(url).toPromise().then(response => {
        if (response) {
          resolve(this.global.getResponseSuccessObj(response));
        } else {
          reject(this.global.getResponseErrorObj());
        }
      }).catch((reason: HttpErrorResponse) => {
        this.errorHandle(reason);
        reject(this.global.getResponseErrorObj(reason, reason.status));
      });
    });
  }

  private errorHandle(error: HttpErrorResponse) {
    console.error(error);
  }

}
