//用来支持跨域的模拟路径
const novel_h5_modelPath = "/novel_h5";
//api接口对象
let api = {};
//是否mock数据的开关
const isMock = false;

if (!isMock) {
  //拉取首页小说资源列表接口地址
  api = {
    indexfictions: `${novel_h5_modelPath}/indexfictions`,
    classifications: `${novel_h5_modelPath}/classifications`
  };

} else {

}

export default api;
