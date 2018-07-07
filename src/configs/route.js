import HomeComponent from "../containers/home";
import BookStoreComponent from "../containers/bookstore";
import RechargeComponent from "../containers/recharge";
import SynopsisComponent from "../containers/synopsis";
import ChapterComponent from "../containers/chapter";
import ReadComonent from "../containers/read";
/**
 * nav路由静态配置
 * @type {*[]}
 */
const route = [
  {path: "/", component: HomeComponent, text: "首页", exact: true, isNav: true},
  {path: "/bookstore", component: BookStoreComponent, text: "书库", isNav: true},
  {path: "/recharge", component: RechargeComponent, text: "充值", isNav: true},
  {path: "/synopsis", component: SynopsisComponent, isNav: false},
  {path: "/chapter", component: ChapterComponent, isNav: false},
  {path: "/read", component: ReadComonent, isNav: false}
];

export default {
  route
};
