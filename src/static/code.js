/**
 * 请求成功的状态码
 * @type {{success: string}}
 */
const code = {
  success: "0"
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

export default {
  code,
  categories_update
};
