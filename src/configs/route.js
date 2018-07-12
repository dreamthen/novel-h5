import HomeComponent from "../containers/home";
import BookStoreComponent from "../containers/bookstore";
import RechargeComponent from "../containers/recharge";
import SynopsisComponent from "../containers/synopsis";
import ChapterComponent from "../containers/chapter";
import ReadComponent from "../containers/read";
import HistoryComponent from "../containers/history";
import ResultComponent from "../containers/result";
import PersonalComponent from "../containers/personal";
import RecordComponent from "../containers/record";


/**
 * nav路由静态配置
 * @type {*[]}
 */
const route = [
  {path: "/", component: HomeComponent, text: "首页", isLink: true, isNav: true},
  {path: "/bookstore", component: BookStoreComponent, text: "书库", isLink: true, isNav: true},
  {path: "/recharge", component: RechargeComponent, text: "充值", isLink: true, isNav: true},
  {path: "/synopsis", component: SynopsisComponent, isLink: false, isNav: true},
  {path: "/chapter", component: ChapterComponent, isLink: false, isNav: true},
  {path: "/read", component: ReadComponent, isLink: false, isNav: false},
  {path: "/history", component: HistoryComponent, isLink: false, isNav: true},
  {path: "/result", component: ResultComponent, isLink: false, isNav: false},
  {path: "/personal", component: PersonalComponent, isLink: false, isNav: true},
  {path: "/record", component: RecordComponent, isLink: false, isNav: true}
];

export default {
  route
};
