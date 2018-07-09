import HomeComponent from "../containers/home";
import BookStoreComponent from "../containers/bookstore";
import RechargeComponent from "../containers/recharge";
import SynopsisComponent from "../containers/synopsis";
import ChapterComponent from "../containers/chapter";
import ReadComonent from "../containers/read";
import HistoryComponent from "../containers/history";
import ResultComponent from "../containers/result";
import NavComponent from "../containers/nav";

import {Router, Route, Switch} from "dva/router";

const NavHome = props => (
  <NavComponent {...props}>
    <Route path="/" component={HomeComponent}/>
  </NavComponent>
);

const NavBookStore = props => (
  <NavComponent {...props}>
    <Route path="/bookstore" component={BookStoreComponent}/>
  </NavComponent>
);
const NavRecharge = props => (
  <NavComponent {...props}>
    <Route path="/recharge" component={RechargeComponent}/>
  </NavComponent>
);

const NavChapter = props => (
  <NavComponent {...props}>
    <Route path="/chapter" component={ChapterComponent}/>
  </NavComponent>
);

const NavHistory = props => (
  <NavComponent {...props}>
    <Route path="/history" component={HistoryComponent}/>
  </NavComponent>
);
const NavSynopsis = props => (
  <NavComponent {...props}>
    <Route path="/synopsis" component={SynopsisComponent}/>
  </NavComponent>
);

const route = ({history}) => {
  return (<Router history={history}>
    <Switch>
      <Route path="/" exact component={NavHome}/>
      <Route path="/bookstore" exact component={NavBookStore}/>
      <Route path="/recharge" exact component={NavRecharge}/>
      <Route path="/chapter" exact component={NavChapter}/>
      <Route path="/read" exact component={ReadComonent}/>
      <Route path="/history" exact component={NavHistory}/>
      <Route path="/result" exact component={ResultComponent}/>
      <Route path="/synopsis" exact component={NavSynopsis}/>
    </Switch>
  </Router>);
};
/**
 * nav路由静态配置
 * @type {*[]}
 */
// const route = [
//   {path: "/", component: HomeComponent, text: "首页", exact: true},
//   {path: "/bookstore", component: BookStoreComponent, text: "书库"},
//   {path: "/recharge", component: RechargeComponent, text: "充值"},
//   {path: "/synopsis", component: SynopsisComponent},
//   {path: "/chapter", component: ChapterComponent},
//   {path: "/read", component: ReadComonent},
//   {path: "/history", component: HistoryComponent},
//   {path: "/result", component: ResultComponent}
// ];

export default {
  route
};
