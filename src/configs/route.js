import HomeComponent from "../containers/home";
import BookStoreComponent from "../containers/bookstore";
import SynopsisComponent from "../containers/synopsis";

/**
 * nav路由静态配置
 * @type {*[]}
 */
const route = [
  {path: "/", component: HomeComponent, text: "首页", exact: true},
  {path: "/bookstore", component: BookStoreComponent, text: "书库"},
  {path: "/synopsis", component: SynopsisComponent, text: "详情", exact: true}
];

export default {
  route
};
