import { getAccount } from "./storage";
export function errorReport(
  message: any,
  reqUrl: string,
  code: any = "未收集"
) {
  let user = getAccount() || "guest";
  let currentPage = window.location.href.toString();
  //浏览器的正式名称
  let appName = navigator.appName.toString();
  //浏览器的版本号
  let appVersion = navigator.appVersion.toString();
}
