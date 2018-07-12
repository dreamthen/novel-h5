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
    //拉取所有小说分类列表接口地址
    classifications: `${novel_h5_modelPath}/classifications`,
    //小说书库查询接口地址
    fictions: `${novel_h5_modelPath}/fictions`,
    //搜索充值产品列表接口地址
    chargeproducts: `${novel_h5_modelPath}/chargeproducts`,
    chapters: `${novel_h5_modelPath}/chapters`,
    content: `${novel_h5_modelPath}/contents`,
    histories: `${novel_h5_modelPath}/readhistories`,
    //充值接口地址
    payorders: `${novel_h5_modelPath}/payorders`,
    //获取当前会话的用户信息接口地址
    currentuser: `${novel_h5_modelPath}/sessions/currentuser`,
    //获取消费记录接口地址
    consumptions: `${novel_h5_modelPath}/consumptions`
  };

} else {

}

export default api;
