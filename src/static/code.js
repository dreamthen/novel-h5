
/**
 * 请求成功的状态码
 * @type {{success: number}}
 */
const code = {
  success: 0,
  weixin_pay_success: "get_brand_wcpay_request:ok"
};

/**
 * 模拟分类更新标签列表
 * @type {Array}
 */
const categories_update = [{
  id: 'all',
  title: '全部',
}, {
  id: 'going',
  title: '连载'
}, {
  id: 'ended',
  title: '完结'
}];

/**
 * 模拟充值页面年卡或者月卡
 * @type {{}}
 */
const recharge_static = {
  empty_balance: [-1, -2]
};

export default {
  code,
  categories_update,
  recharge_static
};
