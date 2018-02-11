/**
 * 处理http返回对象
 */
export class Response {
  data: any; // 请求成功返回数据
  msg: string; // 消息提示
  success: boolean;// 是否返回成功
  error: any;// 错误异常
  code: number;// 响应代码
}
