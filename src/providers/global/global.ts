import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Response} from "../../bean/response";

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

  public readonly server = {
    ip: '192.168.199.113',
    port: 9090,
  };

  public readonly suffix = `http://${this.server.ip}:${this.server.port}/`;

  public readonly api = {
    songSheetByType: `${this.suffix}music/api/songSheet/type/`,
    songById: `${this.suffix}music/api/song/`,
    songUrlById: `${this.suffix}music/api/song/url/`
  };

  /**
   * 网络请求返回错误处理对象
   * @param reason
   * @param {number} code
   * @returns {Response}
   */
  public getResponseErrorObj(reason?: any, code?: number) {
    let r = new Response();
    r.code = code || 500;
    r.msg = '请求失败';
    r.success = false;
    r.error = reason;
    return r;
  }

  /**
   * 网络请求返回成功处理对象
   * @param reason
   * @param {number} code
   * @returns {Response}
   */
  public getResponseSuccessObj(data?: any) {
    let r = new Response();
    r.data = data || {};
    r.code = 200;
    r.msg = '请求成功';
    r.success = true;
    return r;
  }
}
