//用来支持跨域的模拟路径
const novel_h5_modelPath = "/novel_h5";
//api接口对象
let api = {};
//是否mock数据的开关
const isMock = false;

if (!isMock) {
  api = {
    //拉取首页小说资源列表接口地址
    indexfictions: `${novel_h5_modelPath}/indexfictions`,
    classifications: `${novel_h5_modelPath}/classifications`,
    fictions: `${novel_h5_modelPath}/fictions`,
    chargeproducts: `${novel_h5_modelPath}/chargeproducts`,
    chapters: `${novel_h5_modelPath}/chapters`,
    content: `${novel_h5_modelPath}/contents`
  };

} else {

}

export default api;
