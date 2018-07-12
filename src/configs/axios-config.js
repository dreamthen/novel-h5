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
  //当后台返回正常code码时,直接返回响应的data数据对象
  if(code["code"] === errno) {
    return data;
  }
  //遇到其他异常情况,直接返回异常响应的data数据对象
  return Promise.reject(data);
}, () => {

});

export default axiosConfig;

