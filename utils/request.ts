/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from "umi-request";
import { notification } from "antd";
import { getAccess, getRefresh, setAccess, setRefresh } from "./storage";

const codeMessage: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "请注意分辨英文字符和数字，正确输入大小写字符。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

/** 异常处理程序 */
const errorHandler = (error: {
  response: Response;
  data: any;
  request: any;
}): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    if (response.status === 401) {
      notification.error({
        message: `用户名或密码错误`,
        description: errorText,
      });
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
      });
    }
  } else if (!response) {
    notification.error({
      description: "您的网络发生异常，无法连接服务器",
      message: "网络异常",
    });
  }
  return response;
};

/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: "include", // 默认请求是否带上cookie
});

// 请求拦截器，加入accessToken
request.interceptors.request.use((url, options) => {
  const accessToken = getAccess();
  const refreshToken = getRefresh();
  if (accessToken && refreshToken) {
    const headers = { Authorization: `Bearer ${accessToken}` };
    return { url, options: { ...options, headers } };
  }
  return { url, options: { ...options } };
});

// 响应拦截，处理accessToken异常和refreshToken异常

// request.interceptors.response.use(async (response,options)=>{

//     // const finalResult=response;
//     const refreshToken=getRefresh();
//     // const accessToken=getRefresh();

//     const params={
//       refresh:refreshToken,
//     }
//     /*  // // accessToken不存在
//      if (accessToken==='undefined'){
//        notification.error({
//          message: `还未登录，请登录`,
//        });
//        window.location.href="/user/login";
//      }else */
//     if (response && response.status===401){
//       let errorResponse={
//         messages: undefined,
//       };
//       await   response.json().then((r)=> {
//         errorResponse=r;
//       })

//       let result={
//         data: undefined,
//       };
//       // 进入响应拦截器

//       // @ts-ignore
//       if (errorResponse.messages && errorResponse.messages[0].token_type==="access"){

//         try{
//           // access 失效,调用refresh刷新
//           const refreshResponse= axios.post("/api2/account/api-token-refresh/", params);
//           await refreshResponse.then( result2=>{
//             result=result2;
//           })
//         }catch (e) {
//           notification.error({
//             message: `登录过期，请重新登录`,
//           });
//           window.location.href="/user/login";
//         }

//         // @ts-ignore
//         setAccess(result.data.access)
//         // @ts-ignore
//         setRefresh(result.data.refresh)
//         // 获得responseConfig 重新发送之前请求
//         // const secAccess=localStorage.getItem('currentAccess');
//         const secUrl=options.url;
//         const secOption=options.params;
//         // @ts-ignore
//         const  secHeaders= { Authorization: `Bearer ${result.data.access}`};
//         let secParams={}
//         if (options.method==='GET'){
//           secParams={
//             method:options.method,
//             params:secOption,
//           }
//         }else{
//           secParams={
//             method:options.method,
//             data:secOption,
//           }
//         }

//         // 继续之前的请求
//         const finalRe=  await request(secUrl,secParams);
//         return finalRe;

//       }

//     }

//     return response;
//   },

// )

export default request;
