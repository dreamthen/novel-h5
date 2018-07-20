import axios from "axios";
import code from "../static/code";

const axios_config = axios.create({});

const GET = "GET";

const axiosConfig = ({url, method, params, headers}) => {
  return axios_config({
    url,
    method,
    responseType: "json",
    headers: Object.assign({}, headers, {
      contentType: "application/json"
    }),
    params: method === GET ? params : {},
    data: method === GET ? {} : params
  }).then((response) => {
    return response;
  }, (response) => {
    return response;
  }).catch((error) => {
    // ！上方的reject回调覆盖了这里的catch，不会到达这里
  });
};

//axios xhr请求库对请求的处理
axios_config.interceptors.request.use((request) => {
  return request;
}, () => {

});

//axios xhr请求库对响应的处理
axios_config.interceptors.response.use((response) => {
  //获取响应的data数据对象
  let data = response.data,
      errno = data.errno;
  //当后台返回正常code码时,添加一个业务请求成功标记位
  data.success = code["code"]["success"] === errno;
  //直接返回异常响应的data数据对象
  return data;
}, (err) => {
  switch(err.response.status) {
    case 401:
    default:
      const appId = localStorage.getItem('appId');
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http%3a%2f%2fpublic.1jtec.com%2fnovel_h5%2fsessions%2fnew%3ftarget_url%3dhttp%3a%2f%2fpublic.1jtec.com%26share_date%3d2018-07-11+20%3a14%3a00%26from_openid%3dokACP0ZTkyvV1asJBk___g8YREDk%26ref_app_name%3d%e4%bc%9a%e8%af%9d%e8%bf%87%e6%9c%9f%e8%b7%b3%e8%bd%ac%26app_id%3d${appId}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`;
      break;
  }
  return Promise.reject(err);
});

export default axiosConfig;

